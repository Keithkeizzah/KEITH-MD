/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { AxiosCacheInstance } from '../cache/axios.mjs';
export declare function defaultRequestInterceptor(axios: AxiosCacheInstance): {
    onFulfilled: (value: import("../cache/axios.mjs").InternalCacheRequestConfig<unknown, unknown>) => import("../cache/axios.mjs").InternalCacheRequestConfig<unknown, unknown> | Promise<import("../cache/axios.mjs").InternalCacheRequestConfig<unknown, unknown>>;
    apply: () => number;
};
//# sourceMappingURL=request.d.ts.map