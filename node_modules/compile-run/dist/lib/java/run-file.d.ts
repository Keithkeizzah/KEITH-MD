import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a Java file on a given path and
 * @param filePath A path like string
 * @param options
 * @param callback
 */
export declare function runJavaFile(filePath: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Java file on a given path and
 * @param filePath A path like string
 * @param callback
 */
export declare function runJavaFile(filePath: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Java file on a given path and
 * @param filePath A path like string
 * @param options
 */
export declare function runJavaFile(filePath: string, options?: Options): Promise<Result>;
export declare function runJavaFileAndReturnPromise(filePath: string, options?: Options): Promise<Result>;
