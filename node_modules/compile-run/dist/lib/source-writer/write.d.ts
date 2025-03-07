import { LanguageNames } from '../types';
/**
 * Writes the source code into the file system and returns a promise that resolves to path of the source file
 * @param lang Language of the source code
 * @param source string containing source code to be written
 */
export declare function writeSourceFile(lang: LanguageNames, source: string): Promise<string>;
export declare function getExtension(lang: string): Promise<string>;
