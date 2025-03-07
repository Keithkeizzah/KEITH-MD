/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { CacheAxiosResponse, InternalCacheRequestConfig } from '../cache/axios.mjs';
/** See {@link AxiosInterceptorManager} */
export interface AxiosInterceptor<T> {
    onFulfilled(value: T): T | Promise<T>;
    /** Returns a successful response or re-throws the error */
    onRejected?(error: Record<string, unknown>): T | Promise<T>;
    apply: () => void;
}
export type RequestInterceptor = AxiosInterceptor<InternalCacheRequestConfig<unknown, unknown>>;
export type ResponseInterceptor = AxiosInterceptor<CacheAxiosResponse<unknown, unknown>>;
//# sourceMappingURL=build.d.ts.map