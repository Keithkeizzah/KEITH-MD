import { errorResultCallback, Result, Options } from "../types";
/**
 * executes the javascript source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param options Options object
 * @param callback Optional callback
 */
export declare function runNodeFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * executes the javascript source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param callback Optional callback
 */
export declare function runNodeFile(filePath: string, callback: errorResultCallback): Promise<Result>;
/**
 * executes the javascript source code in the file at the path provided and give stdout and stderr as result
 * @param path A path like string
 * @param options Options object
 */
export declare function runNodeFile(filePath: string, options?: Options): Promise<Result>;
