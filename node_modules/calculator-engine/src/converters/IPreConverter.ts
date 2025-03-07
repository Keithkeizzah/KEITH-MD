import { Converter } from "./Coverter"

export class IPreConverter extends Converter {
    constructor(expression : string){
        super(expression);
    }
    convert(): string {
        throw new Error("Method not implemented.");
    }
    
}