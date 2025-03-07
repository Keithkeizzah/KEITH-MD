import { Options } from "../types";
/**
 * Compiles a C source String And resolves with the path of the executable
 * @param sourceCode
 * @param options
 */
export declare function compileCSource(sourceCode: string, options?: Options): Promise<string>;
