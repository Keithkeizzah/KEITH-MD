import { Options } from "../types";
/**
 * Compiles a Cpp source file and returns a promise that resolves with the path of the executable
 * @param filePath A path like string
 * @param options Optional options
 */
export declare function compileCpp(filePath: string, options?: Options): Promise<string>;
