import { Options, errorResultCallback, Result } from "../types";
/**
 * execute the python source code provided as a string
 * @param soureCode Source code as a string
 * @param options Optional Options object
 * @param callback Optional callback
 */
export declare function runPythonSourceCode(soureCode: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * execute the python source code provided as a string
 * @param soureCode Source code as a string
 * @param options Optional Options object
 */
export declare function runPythonSourceCode(soureCode: string, options?: Options): Promise<Result>;
/**
 * execute the python source code provided as a string
 * @param soureCode Source code as a string
 * @param callback Optional callback
 */
export declare function runPythonSourceCode(soureCode: string, callback: errorResultCallback): Promise<Result>;
