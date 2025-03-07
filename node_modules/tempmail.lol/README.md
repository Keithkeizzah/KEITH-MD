# TempMail.lol JS API
<a href="https://npmjs.com/tempmail.lol">
    <img alt="npm" src="https://img.shields.io/npm/v/tempmail.lol">
</a>
<a href="https://discord.gg/GHapeHPWVS">
    <img alt="discord" src="https://discord.com/api/guilds/899020130091139082/widget.png">
</a>

This is an API for the temporary email service [TempMail.lol](https://tempmail.lol).

## Installation
```bash
npm i tempmail.lol
# or, if you use yarn
yarn add tempmail.lol
```

This has built-in types.

## Usage

First, create a TempMail object:
```js
const tempmail = new TempMail();

//if you have a TempMail Plus/Ultra account, you can add it here:
const tempmail = new TempMail("API Key");
```

### Types

Email:
```ts
type Email = {
    from: string,
    to: string,
    subject: string,
    body: string,
    html: string | null, //only if the email is HTML
    date: number, //date in unix millis
    ip: string, //IP address of sender
}
```

Inbox:
```ts
type Inbox = {
    address: string, //address of inbox
    token: string, //token to use for checkInbox
}
```

### Create inbox

To create an inbox:
```js

//simply, you can use the following function
tempmail.createInbox().then(inbox => {
    console.log(`Inbox: ${inbox.address} with a token of ${inbox.token}`);
});

//Or as async
const inbox: Inbox = await tempmail.createInbox();

//there are some advanced options as well

//whether or not to create a community address
tempmail.createInbox({
    community: false,
    domain: "cooldomain.com",
    prefix: "optional",
});

```

Note: inboxes expire after 1, 10, or 30 hours with TempMail Free, Plus, and Ultra (respectively).

### Retrieve emails

To get the emails in an inbox:
```js

//you can also pass through the Inbox object instead of the token string
const emails = tempmail.checkInbox("<TOKEN>").then((emails) => {
    if(!emails) {
        console.log(`Inbox expired since "emails" is undefined...`);
        return;
    }
    
    console.log(`We got some emails!`);
    
    for(let i = 0; i < emails.length; i++) {
        console.log(`email ${i}: ${JSON.stringify(emails[i])}`);
    }
});
```

### Custom Domains

#### Note: you will need to be a TempMail Plus/Ultra subscriber to use custom domains!

To setup Custom Domains, visit your account on https://tempmail.lol/account and follow the instructions on https://tempmail.lol/custom

After setting up Custom Domains, they can be checked the same way you make normal domains (note: only your account can access the domain!)

```js
tempmail.createInbox({
    community: false,
    domain: "example.com", //replace with your custom domain
    prefix: "optional", //this will be the ENTIRE beginning of the email.  "optional" results in "optional@example.com".
});
```

### Webhooks

You can set up a webhook to be called when an email is received.  You must have Custom Domains setup beforehand.

```js
tempmail.setWebhook("https://example.com/webhook").then(() => {
    console.log("Webhook set!");
});
```

You can also remove the webhook:

```js
tempmail.removeWebhook().then(() => {
    console.log("Webhook removed!");
});
```

This feature is only available to TempMail Ultra subscribers.  Any email created after setting the webhook will trigger the webhook.
The email will not be returned in the `checkInbox` function.

Failed webhooks will not be retried unless a 429 Too Many Requests error is returned.

Webhooks will send data in a JSON format as an array of Email objects.
