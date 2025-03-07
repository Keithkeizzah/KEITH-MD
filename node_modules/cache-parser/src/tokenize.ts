/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { CacheControl } from './index';
import { isDuration, isTruthy } from './util';

/**
 * Return an array of tokens from the header object.
 *
 * #### The output is sorted by alphabetical order
 *
 * The cache control object does not need to be a CacheControl object from the
 * {@link CacheControl}.This means that the parameter do not have to pass in the
 * {@link isCacheControl} function.
 *
 * You can build a string with `.join(', ')` method.
 *
 * @example
 *
 * ```js
 * const tokens = tokenize({ maxAge: 3600, noCache: true }); // ['max-age=3600',
 * 'no-cache']
 *
 * const header = tokens.join(', '); // 'max-age=3600, no-cache'
 * ```
 *
 * @param header The cache control object
 * @returns An array of directives an their respective values.
 */
export function tokenize(header?: CacheControl): string[] {
  if (!header || typeof header !== 'object') {
    return [];
  }

  const tokens: string[] = [];

  if (isTruthy(header.immutable)) {
    tokens.push('immutable');
  }

  if (isDuration(header.maxAge)) {
    tokens.push(`max-age=${header.maxAge}`);
  }

  if (isDuration(header.maxStale)) {
    tokens.push(`max-stale=${header.maxStale}`);
  }

  if (isDuration(header.minFresh)) {
    tokens.push(`min-fresh=${header.minFresh}`);
  }

  if (isTruthy(header.mustRevalidate)) {
    tokens.push('must-revalidate');
  }

  if (isTruthy(header.mustUnderstand)) {
    tokens.push('must-understand');
  }

  if (isTruthy(header.noCache)) {
    tokens.push('no-cache');
  }

  if (isTruthy(header.noStore)) {
    tokens.push('no-store');
  }

  if (isTruthy(header.noTransform)) {
    tokens.push('no-transform');
  }

  if (isTruthy(header.onlyIfCached)) {
    tokens.push('only-if-cached');
  }

  if (isTruthy(header.private)) {
    tokens.push('private');
  }

  if (isTruthy(header.proxyRevalidate)) {
    tokens.push('proxy-revalidate');
  }

  if (isTruthy(header.public)) {
    tokens.push('public');
  }

  if (isDuration(header.sMaxAge)) {
    tokens.push(`s-maxage=${header.sMaxAge}`);
  }

  if (isDuration(header.staleIfError)) {
    tokens.push(`stale-if-error=${header.staleIfError}`);
  }

  if (isDuration(header.staleWhileRevalidate)) {
    tokens.push(`stale-while-revalidate=${header.staleWhileRevalidate}`);
  }

  return tokens;
}
