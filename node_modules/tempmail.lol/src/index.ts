#!

import fetch from "node-fetch";

import Inbox from "./Inbox";
import Email from "./Email";
import { CreateInboxOptions } from "./CreateInboxOptions";

const BASE_URL = "https://api.tempmail.lol/v2";

export class TempMail {
    
    constructor(
        private api_key?: string,
    ) {}
    
    private async makeRequest(url: string, post_data?: any, method?: "POST" | "GET" | "DELETE"): Promise<any> {
        
        let headers = {
            "User-Agent": "TempMailJS/4.4.0"
        };
        
        //if the user is a TempMail Plus subscriber, add the credentials here
        if(this.api_key) {
            headers["Authorization"] = "Bearer " + this.api_key;
        }

        if(method && method === "POST" && post_data) {
            headers["Content-Type"] = "application/json";
        }
        
        const raw = await fetch(BASE_URL + url, {
            headers,
            method: method ? method : (post_data ? "POST" : "GET"),
            body: post_data ? JSON.stringify(post_data) : undefined,
        });
        
        //check for errors
        if(raw.status === 402) { //no time left
            throw new Error("Account has no more time left.");
        } else if(raw.status === 403 && this.api_key) { //invalid credentials
            throw new Error("Invalid BananaCrumbs credentials provided.");
        } else if(raw.status === 414) {
            throw new Error("The provided webhook URL was too long (max 128 characters).");
        } else if(raw.status === 500) {
            throw new Error("The server encountered an internal error: " + await raw.text());
        } else if(!raw.ok) { //other error
            throw new Error(`TempMail API error: [${raw.status}] - ${await raw.text()}`);
        }
        
        return await raw.json();
    }
    
    /**
     * Create a new inbox.
     * 
     * @param community {boolean} true to use community (formerly "rush mode") domains
     * @param domain {string} the specific domain to use.
     * @returns {Inbox} the Inbox object with the address and token.
     */
    async createInbox(options?: CreateInboxOptions): Promise<Inbox> {
        let url = "/inbox/create";
        
        const r = await this.makeRequest(url, options, "POST");
        
        return {
            address: r.address,
            token: r.token,
        };
    }
    
    /**
     * Check an inbox for emails.
     * 
     * @param authentication
     * @returns {Email[] | undefined} the Email array, or undefined if the inbox has expired.
     */
    async checkInbox(authentication: string | Inbox): Promise<Email[] | undefined> {
        const token = authentication instanceof Inbox ? authentication.token : authentication;
        
        const r = await this.makeRequest(`/inbox?token=${token}`);
        
        if(r.expired) {
            return undefined;
        }
        
        return r.emails;
    }
    
    /**
     * Check a custom domain.
     * 
     * Note that this requires a TempMail Plus subscription, as well as being logged in through `this` object.
     * 
     * @param domain {string} the domain to check.
     * @param token {string} the pre-SHA512 token to use for authentication.
     * @returns {Email[]} the emails, or undefined if there was an issue checking.
     */
    async checkCustomDomainLegacy(domain: string, token: string): Promise<Email[]> {
        
        const raw = (await fetch(`https://api.tempmail.lol/custom/${token}/${domain}`, {
            headers: {
                "Authorization": "Bearer " + this.api_key,
            },
        }));
        const r = await raw.json();
        
        let emails: Email[];
        
        if(r.email === null) {
            emails = [];
        } else {
            emails = r.email;
        }
        
        return emails;
    }
    
    /**
     * Check a new custom domain.  Note that v2 custom domains are different in the way
     * the domain records are made.  Please visit https://tempmail.lol/account and visit custom
     * domains to see how to set the records.
     * 
     * @param domain {string} your domain.
     */
    async checkV2CustomDomain(domain: string): Promise<Email[] | undefined> {
        return (await this.makeRequest("/custom?domain=" + domain)).email;
    }
    
    /**
     * Set the webhook for this account
     * @param webhook_url {string} the webhook URL to use.
     */
    async setWebhook(webhook_url: string): Promise<void> {
        return this.makeRequest(`/webhook/`, {
            url: webhook_url,
        });
    }
    
    /**
     * Remove a webhook from the account.
     */
    async removeWebhook(): Promise<void> {
        return this.makeRequest(`/webhook`, undefined, "DELETE");
    }
    
    /**
     * Sets a private domain webhook.
     * 
     * Read before using: https://github.com/tempmail-lol/server/wiki/v2-API-Endpoints#set-custom-domain-webhook 
     */
    async setPrivateDomainWebhook(domain: string, webhook_url: string): Promise<void> {
        return this.makeRequest("/private_webhook", {
            domain: domain,
            url: webhook_url,
        });
    }
    
    /**
     * Deletes a private webhook.
     */
    async deletePrivateDomainWebhook(domain: string): Promise<void> {
        return this.makeRequest("/private_webhook?domain=" + domain);
    }
}

export {
    Email, Inbox
};
