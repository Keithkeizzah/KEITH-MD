import { Calculator } from "./Calculator";
if (typeof window === 'undefined'){
    // @ts-ignore
    global.Calculator = Calculator;
}else{
    (window as any).Calculator = Calculator;
}

 