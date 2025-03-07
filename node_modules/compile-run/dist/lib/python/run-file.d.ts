import { errorResultCallback, Result, Options } from "../types";
/**
 * executes the python source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param options Optional Options obj
 * @param callback Optional callback
 */
export declare function runPythonFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * executes the python source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param options Optional Options obj
 */
export declare function runPythonFile(filePath: string, options?: Options): Promise<Result>;
/**
 * executes the python source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param callback Optional callback
 */
export declare function runPythonFile(filePath: string, callback: errorResultCallback): Promise<Result>;
