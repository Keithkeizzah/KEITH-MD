import { Calculator } from "./Calculator";
if (typeof window === 'undefined') {
    global.Calculator = Calculator;
}
else {
    window.Calculator = Calculator;
}
