
export default class Email {
    
    public constructor(
        public readonly from: string,
        public readonly to: string,
        public readonly subject: string,
        public readonly body: string,
        public readonly html: string | null,
        public readonly date: number,
        public readonly ip: string,
    ) {}
    
}
