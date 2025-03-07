/// <reference types="node" />
import { Readable } from 'stream';
/**
 * Converts the stream data to string
 * @param stream Stream to be converted
 */
export declare function streamDataToString(stream: Readable): Promise<string>;
