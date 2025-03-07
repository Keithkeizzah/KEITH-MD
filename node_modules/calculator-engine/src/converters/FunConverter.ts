import { Converter } from "./Coverter"

interface Exper {
    input : string;
    output : string;
}

export class FunConverter extends Converter {
    private regex : RegExp ;
    private funcs : object ; 
    private exprs : Exper[] ;
    constructor(expression : string , func? : object){
        super(expression);
        this.exprs = [];
        this.regex =  /(?<input>(?<fun>[A-Za-z]+)\s{0,}\((?<params>[0-9\.\s\+\-,\*\/\%\^]+)\))/g;
        if(func == undefined){
            this.funcs = {};
        }else{
            this.funcs = func;
        }
    }

    private prepare(){
        let exp ;
        while(( exp = this.regex.exec(this.in)) !== null){
            if(typeof this.funcs[exp.groups.fun] == 'function'){
                this.exprs.push({
                    input : exp.groups.input ,
                    output : this.funcs[exp.groups.fun](...exp.groups.params.split(",").map((_)=>{
                        return parseFloat(_)
                    }))
                }); 
            }else if ( typeof Math[exp.groups.fun] == 'function'){
                this.exprs.push({
                    input : exp.groups.input ,
                    output : Math[exp.groups.fun](...exp.groups.params.split(",").map((_)=>{
                        return parseFloat(_)
                    }))
                }); 
            } else{
                throw new Error(`Method ${exp.groups.fun} not found `)
            } 
        }
    }


    convert(): string {
        if(this.out == null){
            this.prepare();
        }
        this.out = this.in;
        for (let i = 0 ; i < this.exprs.length; i++  ){
            this.out = this.out.replace(this.exprs[i].input , this.exprs[i].output );
        }
        this.out = this.out.replace( /[A-Za-z]*/g  ,  '' );
        return this.out; 
    }
}