export class Helper {

    static isDigit(value : any): boolean {
        if(isNaN(parseFloat(value)) ){
            return false;
        }
        return true;
    }

    static isDot (value : any): boolean {
        return "." === value ;
    }

    static isSpace(value : any){
        return " " === value ;
    }

    static isOpenBracket (value : any){
        return "(" === value
    }

    static isClosedBracket (value : any){
        return ")" === value
    }
    
    static isMiuns(value : any , nextValue : any){
        return ( ("-" === value) && (Helper.isDigit(nextValue)) );
    }

    static mathOperatorPriority (value : any):number {
        switch (value){
            case '+': 
            case '-':
                return 1 ;
            case '*' : 
            case '/' :
            case '%' :
                return 2 ;
            case '^' : 
                return 3 ;
            default:
                return 0;
        }
    }
    
}