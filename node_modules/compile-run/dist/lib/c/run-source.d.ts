import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 * @param callback
 */
export declare function runCSource(sourceCode: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param callback
 */
export declare function runCSource(sourceCode: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 */
export declare function runCSource(sourceCode: string, options?: Options): Promise<Result>;
export declare function runCSourceAndReturnPromise(sourceCode: string, options?: Options): Promise<Result>;
