import { Options } from "../types";
/**
 * Compile a java file
 * @param filePath A path like string
 * @param options
 */
export declare function compileJavaFile(filePath: string, options?: Options): Promise<string>;
