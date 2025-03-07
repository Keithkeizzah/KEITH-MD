import type { CacheControl } from './index';
/**
 * Parses the Cache-Control header.
 *
 * You can check if a object was returned by this function with {@link isCacheControl} .
 *
 * @param {string} Header The header to parse
 * @returns {CacheControl} The parsed cache control header
 */
export declare function parse(headerStr?: string): CacheControl;
//# sourceMappingURL=parse.d.ts.map