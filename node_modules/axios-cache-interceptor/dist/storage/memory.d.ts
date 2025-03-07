/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
import type { AxiosStorage, StorageValue } from './types.js';
/**
 * Creates a simple in-memory storage. This means that if you need to persist data between
 * page or server reloads, this will not help.
 *
 * This is the storage used by default.
 *
 * If you need to modify it's data, you can do by the `data` property.
 *
 * @example
 *
 * ```js
 * const memoryStorage = buildMemoryStorage();
 *
 * setupCache(axios, { storage: memoryStorage });
 *
 * // Simple example to force delete the request cache
 *
 * const { id } = axios.get('url');
 *
 * delete memoryStorage.data[id];
 * ```
 *
 * @param {boolean | 'double'} cloneData Use `true` if the data returned by `find()`
 *   should be cloned to avoid mutating the original data outside the `set()` method. Use
 *   `'double'` to also clone before saving value in storage using `set()`. Disabled is
 *   default
 * @param {number | false} cleanupInterval The interval in milliseconds to run a
 *   setInterval job of cleaning old entries. If false, the job will not be created.
 *   Disabled is default
 * @param {number | false} maxEntries The maximum number of entries to keep in the
 *   storage. Its hard to determine the size of the entries, so a smart FIFO order is used
 *   to determine eviction. If false, no check will be done and you may grow up memory
 *   usage. Disabled is default
 */
export declare function buildMemoryStorage(cloneData?: boolean | 'double', cleanupInterval?: number | false, maxEntries?: number | false): MemoryStorage;
export interface MemoryStorage extends AxiosStorage {
    data: Record<string, StorageValue>;
    /** The job responsible to cleaning old entries */
    cleaner: ReturnType<typeof setInterval>;
    /** Tries to remove any invalid entry from the memory */
    cleanup: () => void;
}
//# sourceMappingURL=memory.d.ts.map