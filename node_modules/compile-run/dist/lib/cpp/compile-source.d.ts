import { Options } from "../types";
/**
 * Compiles a Cpp source String And resolves with the path of the executable
 * @param sourceCode
 * @param options
 */
export declare function compileCppSource(sourceCode: string, options?: Options): Promise<string>;
