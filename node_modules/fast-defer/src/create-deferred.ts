import type { Deferred } from './deferred';
import { fastDeferSymbol } from './internal';

/** @returns A new {@link Deferred} object */
export function deferred<T>() {
  let resolve!: Deferred<T>['resolve'];
  let reject!: Deferred<T>['reject'];

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  }) as Deferred<T>;

  promise.resolve = resolve;
  promise.reject = reject;
  promise[fastDeferSymbol] = 1;

  return promise;
}
