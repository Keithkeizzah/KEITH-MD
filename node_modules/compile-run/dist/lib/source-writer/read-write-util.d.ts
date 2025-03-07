/**
 * Promise based wrapper over fs.writeFile to write source file, can be used in an async function
 * @param filePath A path like string
 * @param source Source string to be written
 */
export declare function writeSource(filePath: string, source: string): Promise<void>;
/**
 * Promise based wrapper over fs.writeFile to read source file, can be used in an async function
 * @param filePath A path like string
 */
export declare function readSource(filePath: string): Promise<string>;
