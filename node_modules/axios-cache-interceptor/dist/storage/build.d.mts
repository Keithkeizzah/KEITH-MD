/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { CacheRequestConfig } from '../cache/axios.mjs';
import type { MaybePromise } from '../util/types.mjs';
import type { AxiosStorage, CachedStorageValue, StaleStorageValue, StorageValue } from './types.mjs';
/** Returns true if the provided object was created from {@link buildStorage} function. */
export declare const isStorage: (obj: unknown) => obj is AxiosStorage;
/** Returns true if value must be revalidated */
export declare function mustRevalidate(value: CachedStorageValue | StaleStorageValue): boolean;
/** Returns true if this has sufficient properties to stale instead of expire. */
export declare function canStale(value: CachedStorageValue): boolean;
/**
 * Checks if the provided cache is expired. You should also check if the cache
 * {@link canStale} and {@link mayUseStale}
 */
export declare function isExpired(value: CachedStorageValue | StaleStorageValue): boolean;
export interface BuildStorage extends Omit<AxiosStorage, 'get'> {
    /**
     * Returns the value for the given key. This method does not have to make checks for
     * cache invalidation or anything. It just returns what was previous saved, if present.
     *
     * @param key The key to look for
     * @param currentRequest The current {@link CacheRequestConfig}, if any
     * @see https://axios-cache-interceptor.js.org/guide/storages#buildstorage
     */
    find: (key: string, currentRequest?: CacheRequestConfig) => MaybePromise<StorageValue | undefined>;
}
/**
 * All integrated storages are wrappers around the `buildStorage` function. External
 * libraries use it and if you want to build your own, `buildStorage` is the way to go!
 *
 * The exported `buildStorage` function abstracts the storage interface and requires a
 * super simple object to build the storage.
 *
 * **Note**: You can only create an custom storage with this function.
 *
 * @example
 *
 * ```js
 * const myStorage = buildStorage({
 *   find: () => {...},
 *   set: () => {...},
 *   remove: () => {...},
 *   clear: () => {...}
 * });
 *
 * const axios = setupCache(axios, { storage: myStorage });
 * ```
 *
 * @see https://axios-cache-interceptor.js.org/guide/storages#buildstorage
 */
export declare function buildStorage({ set, find, remove, clear }: BuildStorage): AxiosStorage;
//# sourceMappingURL=build.d.ts.map