/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { CacheAxiosResponse } from '../cache/axios.mjs';
import type { CachePredicate } from './types.mjs';
/** Tests an response against a {@link CachePredicateObject}. */
export declare function testCachePredicate<R = unknown, D = unknown>(response: CacheAxiosResponse<R, D>, predicate: CachePredicate<R, D>): Promise<boolean>;
//# sourceMappingURL=cache-predicate.d.ts.map