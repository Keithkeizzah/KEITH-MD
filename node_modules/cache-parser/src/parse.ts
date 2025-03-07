import type { CacheControl } from './index';
import { cacheControlSymbol } from './internal';
import { isDuration, isTruthy, parseRawHeaders } from './util';

const number = Number;

/**
 * Parses the Cache-Control header.
 *
 * You can check if a object was returned by this function with {@link isCacheControl} .
 *
 * @param {string} Header The header to parse
 * @returns {CacheControl} The parsed cache control header
 */
export function parse(headerStr?: string): CacheControl {
  const header: CacheControl = Object.defineProperty({}, cacheControlSymbol, {
    enumerable: false,
    value: 1
  });

  if (!headerStr || typeof headerStr !== 'string') {
    return header;
  }

  const headers = parseRawHeaders(headerStr);

  const maxAge = headers['max-age'];
  const maxStale = headers['max-stale'];
  const minFresh = headers['min-fresh'];
  const sMaxAge = headers['s-maxage'];
  const staleIfError = headers['stale-if-error'];
  const staleWhileRevalidate = headers['stale-while-revalidate'];

  if (isTruthy(headers['immutable'])) {
    header.immutable = true;
  }

  if (isDuration(maxAge)) {
    header.maxAge = number(maxAge);
  }

  if (isDuration(maxStale)) {
    header.maxStale = number(maxStale);
  }

  if (isDuration(minFresh)) {
    header.minFresh = number(minFresh);
  }

  if (isTruthy(headers['must-revalidate'])) {
    header.mustRevalidate = true;
  }

  if (isTruthy(headers['must-understand'])) {
    header.mustUnderstand = true;
  }

  if (isTruthy(headers['no-cache'])) {
    header.noCache = true;
  }

  if (isTruthy(headers['no-store'])) {
    header.noStore = true;
  }

  if (isTruthy(headers['no-transform'])) {
    header.noTransform = true;
  }

  if (isTruthy(headers['only-if-cached'])) {
    header.onlyIfCached = true;
  }

  if (isTruthy(headers['private'])) {
    header.private = true;
  }

  if (isTruthy(headers['proxy-revalidate'])) {
    header.proxyRevalidate = true;
  }

  if (isTruthy(headers['public'])) {
    header.public = true;
  }

  if (isDuration(sMaxAge)) {
    header.sMaxAge = number(sMaxAge);
  }

  if (isDuration(staleIfError)) {
    header.staleIfError = number(staleIfError);
  }

  if (isDuration(staleWhileRevalidate)) {
    header.staleWhileRevalidate = number(staleWhileRevalidate);
  }

  return header;
}
