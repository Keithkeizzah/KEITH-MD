import { Result, Options, errorResultCallback } from "../types";
/**
 * Runs a Java source string
 * @param source source string
 * @param options
 * @param callback
 */
export declare function runJavaSource(source: string, options: Options, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Java source string
 * @param source source string
 * @param callback
 */
export declare function runJavaSource(source: string, callback: errorResultCallback): Promise<Result>;
/**
 * Runs a Java source string
 * @param source source string
 * @param options
 */
export declare function runJavaSource(source: string, options?: Options): Promise<Result>;
export declare function runJavaSourceAndReturnPromise(filePath: string, options?: Options): Promise<Result>;
