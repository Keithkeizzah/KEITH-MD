import { FunConverter } from "./converters/FunConverter";
import { IPostConverter } from "./converters/IPostConverter";
export class Calculator {
    static fucs : object = {} ;
    static execute(expression: string){
        let postConverter = new IPostConverter((new FunConverter(expression , Calculator.fucs).convert()));
        return postConverter.evaluate();
    }
    static setFucs(fucs: object){
        Calculator.fucs = fucs;
    }
}

