import { Options } from "../types";
/**
 * Compiles a file at some path
 * @param filePath A path like string
 * @param options
 */
export declare function compileJava(filePath: string, options?: Options): Promise<string>;
