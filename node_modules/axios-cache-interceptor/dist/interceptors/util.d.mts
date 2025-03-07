/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { Method } from 'axios';
import type { CacheAxiosResponse, CacheRequestConfig } from '../cache/axios.mjs';
import type { CacheProperties } from '../cache/cache.mjs';
import type { CachedResponse, MustRevalidateStorageValue, StaleStorageValue } from '../storage/types.mjs';
/**
 * Creates a new validateStatus function that will use the one already used and also
 * accept status code 304.
 */
export declare function createValidateStatus(oldValidate?: CacheRequestConfig['validateStatus']): (status: number) => boolean;
/** Checks if the given method is in the methods array */
export declare function isMethodIn(requestMethod?: Method | string, methodList?: Method[]): boolean;
export interface ConfigWithCache<D> extends CacheRequestConfig<unknown, D> {
    cache: Partial<CacheProperties<unknown, D>>;
}
/**
 * This function updates the cache when the request is stale. So, the next request to the
 * server will be made with proper header / settings.
 */
export declare function updateStaleRequest<D>(cache: StaleStorageValue | MustRevalidateStorageValue, config: ConfigWithCache<D>): void;
/**
 * Creates the new date to the cache by the provided response. Also handles possible 304
 * Not Modified by updating response properties.
 */
export declare function createCacheResponse<R, D>(response: CacheAxiosResponse<R, D>, previousCache?: CachedResponse): CachedResponse;
//# sourceMappingURL=util.d.ts.map