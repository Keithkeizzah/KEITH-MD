/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { CacheRequestConfig } from '../cache/axios.js';
import type { KeyGenerator } from './types.js';
/**
 * Builds an generator that receives a {@link CacheRequestConfig} and returns a value
 * hashed by {@link hash}.
 *
 * The value is hashed into a signed integer when the returned value from the provided
 * generator is not a `string` or a `number`.
 *
 * You can return any type of data structure.
 *
 * @example
 *
 * ```js
 * // This generator will return a hash code.
 * // The code will only be the same if url, method and data are the same.
 * const generator = buildKeyGenerator(({ url, method, data }) => ({
 *   url,
 *   method,
 *   data
 * }));
 * ```
 */
export declare function buildKeyGenerator<R = unknown, D = unknown>(generator: (request: CacheRequestConfig<R, D>) => unknown): KeyGenerator<R, D>;
export declare const defaultKeyGenerator: KeyGenerator<unknown, unknown>;
//# sourceMappingURL=key-generator.d.ts.map