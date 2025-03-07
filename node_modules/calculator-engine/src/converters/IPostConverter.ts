import { Converter , Expression , Evaluator } from "./Coverter"
import { Stack } from "../stack/Stack";
import { Helper } from "./helprt";
export class IPostConverter extends Converter  implements  Expression {

    constructor(expression : string){
        
        super(expression);
    }
    /**
     * Get postfix expression from infix 
     * @returns postfix expression
     */
    convert(): string {
        if( this.out != null ){
            return this.out;
        }
        let stack : Stack<String> = new Stack<String>();
        this.out = "" ;
        let char : string = '';
        let position : number = - 1;
        for(let i = 0 ; i < this.in.length ; i++){
            char = this.in.charAt(i);
            // if char digit or dot 
            if( (Helper.isMiuns(char ,this.in.charAt(i+1) )) && (i != position)){
                    let newIput : string = this.in.slice(0 , i).trim();
                    if( (newIput.length > 0) && (Helper.isDigit(newIput.charAt(newIput.length-1)))){
                        char = '+';
                        position = i;
                        --i;
                    }
            }
            if( Helper.isDigit(char) || Helper.isDot(char) || Helper.isSpace(char) || Helper.isMiuns(char , this.in.charAt(i+1))){
                this.out += char;
            }
            // if char is ( 
            else if (Helper.isOpenBracket(char)) {
                    stack.push(char);
            }
            // if char is )
            else if (Helper.isClosedBracket(char)){
                while( (!stack.isEmpty()) &&  (!Helper.isOpenBracket(stack.peek())) ){
                    this.out += " " + stack.pop() ;
                }
                stack.pop();
            }
            // if char is operator
            else {
                if(Evaluator.availableOperators.indexOf(char) == -1){
                    this.out += "0";
                }else{
                    this.out += " " ;
                    while( (!stack.isEmpty()) && ( Helper.mathOperatorPriority(char) <= Helper.mathOperatorPriority(stack.peek()) ) ){
                        this.out +=   stack.pop() + " " ;
                }
                    stack.push(char);
                }
            }

        }


        while(!stack.isEmpty()) {
            this.out += " " +  stack.pop() + " " ;
        }
        return this.out ;
    }
    

    /**
     * 
     * @param expression 
     */
    evaluate(): number {
        if(  this.out == null  ){
            this.convert();
        }
        let  stack : Stack<string> = new Stack<string>();
        for(let current of this.out.trim().split(" ")){
            if(current == ''){
                continue;
            }
            if(Helper.isDigit(current)){
                stack.push(current);
            }else{
                stack.push( Evaluator.mathOperations( stack.isEmpty() ? 0 : parseFloat(stack.pop())  , stack.isEmpty() ? 0 : parseFloat( stack.pop())  , current ).toString());
            }
        }
        return ( (!stack.isEmpty()) && ( ! isNaN( parseFloat(stack.peek()))) )?  parseFloat(stack.pop()) : 0 ;
    }


}