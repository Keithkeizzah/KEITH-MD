import { Options, Result } from "../types";
/**
 * Executes an executable
 * @param filePath A path like string
 * @param options
 */
export declare function runExecutable(filePath: string, options?: Options): Promise<Result>;
