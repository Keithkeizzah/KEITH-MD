/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { AxiosInstance } from 'axios';
import type { AxiosCacheInstance } from './axios.mjs';
import type { CacheInstance, CacheProperties } from './cache.mjs';
export interface CacheOptions extends Partial<CacheInstance>, Partial<CacheProperties> {
}
/**
 * Apply the caching interceptors for a already created axios instance.
 *
 * ```ts
 * const axios = setupCache(axios, OPTIONS);
 * ```
 *
 * The `setupCache` function receives global options and all [request
 * specifics](https://axios-cache-interceptor.js.org/config/request-specifics) ones too.
 * This way, you can customize the defaults for all requests.
 *
 * @param axios The already created axios instance
 * @param config The config for the caching interceptors
 * @returns The same instance with extended typescript types.
 * @see https://axios-cache-interceptor.js.org/config
 */
export declare function setupCache(axios: AxiosInstance, options?: CacheOptions): AxiosCacheInstance;
//# sourceMappingURL=create.d.ts.map