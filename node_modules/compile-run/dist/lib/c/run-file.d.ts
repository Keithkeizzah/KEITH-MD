import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a C file on a given path and
 * @param filePath A path like string
 * @param options
 * @param callback
 */
export declare function runCFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C file on a given path and
 * @param filePath A path like string
 * @param callback
 */
export declare function runCFile(filePath: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C file on a given path and
 * @param filePath A path like string
 * @param options
 */
export declare function runCFile(filePath: string, options?: Options): Promise<Result>;
export declare function runCFileAndReturnPromise(filePath: string, options?: Options): Promise<Result>;
