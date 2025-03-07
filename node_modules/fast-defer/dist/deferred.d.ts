/**
 * A simple promise that can be resolved (or rejected) later
 *
 * **Note**: This does not polyfills the promise object.
 */
export interface Deferred<T = unknown> extends Promise<T> {
    /**
     * Resolve the promise with the given value
     *
     * @param value The value to resolve the promise with
     */
    resolve: (this: void, value: T | PromiseLike<T> | Promise<T>) => void;
    /**
     * Reject the promise with the given reason
     *
     * @param reason The value to reject the promise with
     */
    reject: (this: void, reason?: unknown) => void;
}
//# sourceMappingURL=deferred.d.ts.map