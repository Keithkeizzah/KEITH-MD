
export default class Inbox {
    
    /**
     * Inbox entity.
     * 
     * @param address {string} The address of the inbox.
     * @param token {string} The token of the inbox.
     */
    public constructor(
        public address: string,
        public token: string,
    ) {}
    
}
