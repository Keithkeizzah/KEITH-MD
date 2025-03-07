import { Options, errorResultCallback, Result } from "../types";
/**
 * execute the JavaScript source code provided as a string in a node environment
 * @param soureCode Source code as a string
 * @param options Optional Options object
 * @param callback Optional callback
 */
export declare function runNodeSourceCode(soureCode: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * execute the JavaScript source code provided as a string in a node environment
 * @param soureCode Source code as a string
 * @param callback Optional callback
 */
export declare function runNodeSourceCode(soureCode: string, callback: errorResultCallback): Promise<Result>;
/**
 * execute the JavaScript source code provided as a string in a node environment
 * @param soureCode Source code as a string
 * @param options Optional Options object
 */
export declare function runNodeSourceCode(soureCode: string, options?: Options): Promise<Result>;
