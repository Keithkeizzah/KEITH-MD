import type { Deferred } from './deferred';
import { fastDeferSymbol } from './internal';

/**
 * Detects if the given parameter is a {@link Deferred}
 *
 * @param {any} value The promise to validate
 * @returns True if the given promise is a deferred, false otherwise
 */
export function isDeferred(value?: unknown): value is Deferred {
  return !!value && !!(value as Deferred)[fastDeferSymbol];
}
