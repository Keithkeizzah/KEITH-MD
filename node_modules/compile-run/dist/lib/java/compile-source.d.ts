import { Options } from "../types";
/**
 * Compiles a java source string
 * @param source Java source to be compiled
 * @param options
 */
export declare function compileJavaSource(source: string, options?: Options): Promise<string>;
