interface Expression {
    evaluate() : number ;
}

class Evaluator {
    static availableOperators   = "+-*/%^";
    static mathOperations(second : number , first : number , operation : String) : number {
        switch (operation) {
            case "+" : return first + second;
            case "-" : return first - second;
            case "*" : return first * second;
            case "/" : return first / second;
            case "%" : return first % second;
            case '^' : return Math.pow(first , second);
            default : return 0.0 ;
        }
    }
} 

abstract class Converter {
    protected in : string;
    protected out : string;
    constructor(expression : string){
        this.in = expression;
        this.out = null ;
    }
    abstract convert(): string ;
     getOutput():string{
        if(this.out==null){
            return this.convert();
        }
        return this.out ;
     }
}
export { Converter  , Expression , Evaluator}; ;