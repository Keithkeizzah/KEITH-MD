import { Converter } from "./Coverter";
export class IPreConverter extends Converter {
    constructor(expression) {
        super(expression);
    }
    convert() {
        throw new Error("Method not implemented.");
    }
}
