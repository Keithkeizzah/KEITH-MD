import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a Cpp source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 * @param callback
 */
export declare function runCppSource(sourceCode: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param callback
 */
export declare function runCppSource(sourceCode: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a C source code provided as string
 * @param sourceCode source string to be executed
 * @param options
 */
export declare function runCppSource(sourceCode: string, options?: Options): Promise<Result>;
export declare function runCppSourceAndReturnPromise(sourceCode: string, options?: Options): Promise<Result>;
