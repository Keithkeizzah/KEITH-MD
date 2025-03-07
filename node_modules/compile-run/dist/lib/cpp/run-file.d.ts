import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a Cpp file on a given path and
 * @param filePath A path like string
 * @param options
 * @param callback
 */
export declare function runCppFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Cpp file on a given path and
 * @param filePath A path like string
 * @param callback
 */
export declare function runCppFile(filePath: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Cpp file on a given path and
 * @param filePath A path like string
 * @param options
 */
export declare function runCppFile(filePath: string, options?: Options): Promise<Result>;
export declare function runCppFileAndReturnPromise(filePath: string, options?: Options): Promise<Result>;
