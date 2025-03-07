/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { cacheControlSymbol } from './internal';

export * from './parse';
export * from './tokenize';

/**
 * Detects if the given parameter is a {@link CacheControl} object.
 *
 * @param {any} obj The object to test
 * @returns {boolean} True if the parameter was created by the {@link parse} function
 */
export function isCacheControl(obj?: unknown): obj is CacheControl {
  return !!obj && !!(obj as Record<symbol, boolean>)[cacheControlSymbol];
}

/**
 * The Cache-Control HTTP header field holds directives (instructions) — in both requests
 * and responses — that control caching in browsers and shared caches (e.g. Proxies,
 * CDNs).
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */
export declare type CacheControl = {
  /**
   * The immutable response directive indicates that the response will not be updated
   * while it's fresh.
   *
   * ```txt
   * Cache-Control: public, max-age=604800, immutable
   * ```
   *
   * A modern best practice for static resources is to include version/hashes in their
   * URLs, while never modifying the resources — but instead, when necessary, updating the
   * resources with newer versions that have new version-numbers/hashes, so that their
   * URLs are different. That’s called the cache-busting pattern.
   *
   * ```html
   * <script src=https://example.com/react.0.0.0.js></script>
   * ```
   *
   * When a user reloads the browser, the browser will send conditional requests for
   * validating to the origin server. But it's not necessary to revalidate those kinds of
   * static resources even when a user reloads the browser, because they're never
   * modified. immutable tells a cache that the response is immutable while it's fresh,
   * and avoids those kinds of unnecessary conditional requests to the server.
   *
   * When you use a cache-busting pattern for resources and apply them to a long max-age,
   * you can also add immutable to avoid revalidation.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#immutable
   */
  immutable?: true;
  /**
   * The max-age=N response directive indicates that the response remains fresh until N
   * seconds after the response is generated.
   *
   * ```txt
   * Cache-Control: max-age=604800
   * ```
   *
   * Indicates that caches can store this response and reuse it for subsequent requests
   * while it's fresh.
   *
   * Note that max-age is not the elapsed time since the response was received, but
   * instead the elapsed time since the response was generated on the origin server. So if
   * the other cache(s) on the path the response takes store it for 100 seconds (indicated
   * using the Age response header field), the browser cache would deduct 100 seconds from
   * its freshness lifetime.
   *
   * ```txt
   * Cache-Control: max-age=604800
   * Age: 100
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#max-age
   */
  maxAge?: number;
  /**
   * The max-stale=N request directive indicates that the client allows a stored response
   * that is stale within N seconds.
   *
   * ```txt
   * Cache-Control: max-stale=3600
   * ```
   *
   * In the case above, if the response with Cache-Control: max-age=604800 was stored on
   * caches 3 hours ago, the cache couldn't reuse that response.
   *
   * Clients can use this header when the origin server is down or too slow and can accept
   * cached responses from caches even if they are a bit old.
   *
   * Note that the major browsers do not support requests with max-stale.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#max-stale
   */
  maxStale?: number;
  /**
   * The min-fresh=N request directive indicates that the client allows a stored response
   * that is fresh for at least N seconds.
   *
   * ```txt
   * Cache-Control: min-fresh=600
   * ```
   *
   * In the case above, if the response with Cache-Control: max-age=3600 was stored in
   * caches 51 minutes ago, the cache couldn't reuse that response.
   *
   * Clients can use this header when the user requires the response to not only be fresh,
   * but also requires that it won't be updated for a period of time.
   *
   * Note that the major browsers do not support requests with min-fresh.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#min-fresh
   */
  minFresh?: number;
  /**
   * The must-revalidate response directive indicates that the response can be stored in
   * caches and can be reused while fresh. Once it becomes stale, it must be validated
   * with the origin server before reuse.
   *
   * Typically, must-revalidate is used with max-age.
   *
   * ```txt
   * Cache-Control: max-age=604800, must-revalidate
   * ```
   *
   * HTTP allows caches to reuse stale responses when they are disconnected from the
   * origin server. must-revalidate is a way to prevent that, so that the cache either
   * revalidates the stored response with the origin server, or if that's not possible it
   * generates a 504 (Gateway Timeout) response.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#must-revalidate
   */
  mustRevalidate?: true;

  mustUnderstand?: true;
  /**
   * The no-cache response directive indicates that the response can be stored in caches,
   * but must be validated with the origin server before each reuse — even when the cache
   * is disconnected from the origin server.
   *
   * ```txt
   * Cache-Control: no-cache
   * ```
   *
   * If you want caches to always check for content updates while reusing stored content
   * when it hasn't changed, no-cache is the directive to use. It does this by requiring
   * caches to revalidate each request with the origin server.
   *
   * Note that no-cache does not mean "don't cache". no-cache allows caches to store a
   * response, but requires them to revalidate it before reuse. If the sense of "don't
   * cache" that you want is actually "don't store", then no-store is the directive to
   * use.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#no-cache
   */
  noCache?: true;
  /**
   * The no-store response directive indicates that any caches of any kind (private or
   * shared) should not store this response.
   *
   * ```txt
   * Cache-Control: no-store
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#no-store
   */
  noStore?: true;
  /**
   * Some intermediaries transform content for various reasons. For example, some convert
   * images to reduce transfer size. In some cases, this is undesirable for the content
   * provider.
   *
   * No-transform indicates that any intermediary (regardless of whether it implements a
   * cache) shouldn't transform the response contents.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#no-transform
   */
  noTransform?: true;
  /**
   * The client indicates that cache should obtain an already-cached response. If a cache
   * has stored a response, it’s reused.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#only-if-cached
   */
  onlyIfCached?: true;
  /**
   * The private response directive indicates that the response can be stored only in a
   * private cache (e.g. local caches in browsers).
   *
   * ```txt
   * Cache-Control: private
   * ```
   *
   * You should add the private directive for user-personalized content — in particular,
   * responses received after login, and sessions managed via cookies.
   *
   * If you forget to add private to a response with personalized content, then that
   * response can be stored in a shared cache and end up being used by multiple users,
   * which can cause personal information to leak.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#private
   */
  private?: true;
  /**
   * The proxy-revalidate response directive is the equivalent of must-revalidate, but
   * specifically for shared caches only.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#proxy-revalidate
   */
  proxyRevalidate?: true;
  /**
   * Responses for requests with Authorization header fields must not be stored in a
   * shared cache. But the public directive will cause such responses to be stored in a
   * shared cache.
   *
   * ```txt
   * Cache-Control: public
   * ```
   *
   * In general, when pages are under Basic Auth or Digest Auth, the browser sends
   * requests with the Authorization header. That means the response is access-controlled
   * for restricted users (who have accounts), and it's fundamentally not
   * shared-cacheable, even if it has max-age.
   *
   * You can use the public directive to unlock that restriction.
   *
   * ```txt
   * Cache-Control: public, max-age=604800
   * ```
   *
   * Note that, s-maxage or must-revalidate also unlock that restriction.
   *
   * If a request doesn’t have an Authorization header, or you are already using s-maxage
   * or must-revalidate in the response, then you don't need to use public.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#public
   */
  public?: true;
  /**
   * The s-maxage response directive also indicates how long the response is fresh for
   * (similar to max-age) — but it is specific to shared caches, and they will ignore
   * max-age when it is present.
   *
   * ```txt
   * Cache-Control: s-maxage=604800
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#s-maxage
   */
  sMaxAge?: number;
  /**
   * The stale-if-error response directive indicates that the cache can reuse a stale
   * response when an origin server responds with an error (500, 502, 503, or 504).
   *
   * ```txt
   * Cache-Control: max-age=604800, stale-if-error=86400
   * ```
   *
   * In the example above, the response is fresh for 7 days (604800s). After 7 days it
   * becomes stale, but it can be used for an extra 1 day (86400s) if the server responds
   * with an error.
   *
   * After a period of time, the stored response became stale normally. That means the
   * client will receive an error response as-is if the origin server sends it.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-if-error
   */
  staleIfError?: number;
  /**
   * The stale-while-revalidate response directive indicates that the cache could reuse a
   * stale response while it revalidates it to a cache.
   *
   * ```txt
   * Cache-Control: max-age=604800, stale-while-revalidate=86400
   * ```
   *
   * In the example above, the response is fresh for 7 days (604800s). After 7 days, it
   * becomes stale but the cache is allowed to reuse it for any requests that are made in
   * the following day (86400s) — provided that they revalidate the response in the
   * background.
   *
   * Revalidation will make the cache be fresh again, so it appears to clients that it was
   * always fresh during that period — effectively hiding the latency penalty of
   * revalidation from them.
   *
   * If no request happened during that period, the cache became stale and the next
   * request will revalidate normally.
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate
   */
  staleWhileRevalidate?: number;
};
