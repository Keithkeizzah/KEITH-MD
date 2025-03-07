import type { CacheControl } from './index';
/**
 * Return an array of tokens from the header object.
 *
 * #### The output is sorted by alphabetical order
 *
 * The cache control object does not need to be a CacheControl object from the
 * {@link CacheControl}.This means that the parameter do not have to pass in the
 * {@link isCacheControl} function.
 *
 * You can build a string with `.join(', ')` method.
 *
 * @example
 *
 * ```js
 * const tokens = tokenize({ maxAge: 3600, noCache: true }); // ['max-age=3600',
 * 'no-cache']
 *
 * const header = tokens.join(', '); // 'max-age=3600, no-cache'
 * ```
 *
 * @param header The cache control object
 * @returns An array of directives an their respective values.
 */
export declare function tokenize(header?: CacheControl): string[];
//# sourceMappingURL=tokenize.d.ts.map