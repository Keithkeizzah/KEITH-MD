import { LanguageExtMap } from './interfaces/Language-ext';
import { Result } from './interfaces/result';
import { Options } from './interfaces/options';
export declare type LanguageNames = 'python' | 'java' | 'node' | 'cpp' | 'c';
export { LanguageExtMap, Result, Options };
/**
 * Optional callback for the run APIs
 * @param err Error if any
 * @param res The result object containing stderr and stdout
 */
export declare type errorResultCallback = (err: Error | undefined, res?: Result) => void;
