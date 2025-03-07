/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { CacheAxiosResponse } from '../cache/axios.mjs';
import type { AxiosStorage } from '../storage/types.mjs';
import type { CacheUpdater } from './types.mjs';
/** Function to update all caches, from CacheProperties.update, with the new data. */
export declare function updateCache<R, D>(storage: AxiosStorage, data: CacheAxiosResponse<R, D>, cacheUpdater: CacheUpdater<R, D>): Promise<void>;
//# sourceMappingURL=update-cache.d.ts.map