/*!
 * Axios Cache Interceptor 1.6.2
 * (c) 2021-present Arthur Fiorette & Contributors
 * Released under the MIT License.
 */
var cacheParser = require('cache-parser');
var fastDefer = require('fast-defer');
var objectCode = require('object-code');

const Header = Object.freeze({
  /**
   * ```txt
   * If-Modified-Since: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
   */
  IfModifiedSince: 'if-modified-since',
  /**
   * ```txt
   * Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
   */
  LastModified: 'last-modified',
  /**
   * ```txt
   * If-None-Match: "<etag_value>"
   * If-None-Match: "<etag_value>", "<etag_value>", …
   * If-None-Match: *
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match
   */
  IfNoneMatch: 'if-none-match',
  /**
   * ```txt
   * Cache-Control: max-age=604800
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   */
  CacheControl: 'cache-control',
  /**
   * ```txt
   * Pragma: no - cache;
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
   */
  Pragma: 'pragma',
  /**
   * ```txt
   * ETag: W / '<etag_value>';
   * ETag: '<etag_value>';
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
   */
  ETag: 'etag',
  /**
   * ```txt
   * Expires: <http-date>
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires
   */
  Expires: 'expires',
  /**
   * ```txt
   * Age: <delta-seconds>
   * ```
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age
   */
  Age: 'age',
  /**
   * Used internally as metadata to mark the cache item as revalidatable and enabling
   * stale cache state Contains a string of ASCII characters that can be used as ETag for
   * `If-Match` header Provided by user using `cache.etag` value.
   *
   * ```txt
   * X-Axios-Cache-Etag: "<etag_value>"
   * ```
   */
  XAxiosCacheEtag: 'x-axios-cache-etag',
  /**
   * Used internally as metadata to mark the cache item as revalidatable and enabling
   * stale cache state may contain `'use-cache-timestamp'` if `cache.modifiedSince` is
   * `true`, otherwise will contain a date from `cache.modifiedSince`. If a date is
   * provided, it can be used for `If-Modified-Since` header, otherwise the cache
   * timestamp can be used for `If-Modified-Since` header.
   *
   * ```txt
   * X-Axios-Cache-Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT
   * X-Axios-Cache-Last-Modified: use-cache-timestamp
   * ```
   */
  XAxiosCacheLastModified: 'x-axios-cache-last-modified',
  /**
   * Used internally as metadata to mark the cache item able to be used if the server
   * returns an error. The stale-if-error response directive indicates that the cache can
   * reuse a stale response when any error occurs.
   *
   * ```txt
   * XAxiosCacheStaleIfError: <seconds>
   * ```
   */
  XAxiosCacheStaleIfError: 'x-axios-cache-stale-if-error'
});

const defaultHeaderInterpreter = headers => {
  if (!headers) return 'not enough headers';
  const cacheControl = headers[Header.CacheControl];
  if (cacheControl) {
    const {
      noCache,
      noStore,
      maxAge,
      maxStale,
      immutable,
      staleWhileRevalidate
    } = cacheParser.parse(String(cacheControl));
    // Header told that this response should not be cached.
    if (noCache || noStore) {
      return 'dont cache';
    }
    if (immutable) {
      // 1 year is sufficient, as Infinity may cause problems with certain storages.
      // It might not be the best way, but a year is better than none. Facebook shows
      // that a browser session stays at the most 1 month.
      return {
        cache: 1000 * 60 * 60 * 24 * 365
      };
    }
    if (maxAge !== undefined) {
      const age = headers[Header.Age];
      return {
        cache: age ?
        // If age is present, we must subtract it from maxAge
        (maxAge - Number(age)) * 1000 : maxAge * 1000,
        // Already out of date, must be requested again
        stale:
        // I couldn't find any documentation about who should be used, as they
        // are not meant to overlap each other. But, as we cannot request in the
        // background, as the stale-while-revalidate says, and we just increase
        // its staleTtl when its present, max-stale is being preferred over
        // stale-while-revalidate.
        maxStale !== undefined ? maxStale * 1000 : staleWhileRevalidate !== undefined ? staleWhileRevalidate * 1000 : undefined
      };
    }
  }
  const expires = headers[Header.Expires];
  if (expires) {
    const milliseconds = Date.parse(String(expires)) - Date.now();
    return milliseconds >= 0 ? {
      cache: milliseconds
    } : 'dont cache';
  }
  return 'not enough headers';
};

/**
 * Creates a new validateStatus function that will use the one already used and also
 * accept status code 304.
 */
function createValidateStatus(oldValidate) {
  return oldValidate ? status => oldValidate(status) || status === 304 : status => status >= 200 && status < 300 || status === 304;
}
/** Checks if the given method is in the methods array */
function isMethodIn(requestMethod = 'get', methodList = []) {
  requestMethod = requestMethod.toLowerCase();
  return methodList.some(method => method === requestMethod);
}
/**
 * This function updates the cache when the request is stale. So, the next request to the
 * server will be made with proper header / settings.
 */
function updateStaleRequest(cache, config) {
  config.headers || (config.headers = {});
  const {
    etag,
    modifiedSince
  } = config.cache;
  if (etag) {
    var _cache$data;
    const etagValue = etag === true ? (_cache$data = cache.data) == null ? void 0 : _cache$data.headers[Header.ETag] : etag;
    if (etagValue) {
      config.headers[Header.IfNoneMatch] = etagValue;
    }
  }
  if (modifiedSince) {
    config.headers[Header.IfModifiedSince] = modifiedSince === true ?
    // If last-modified is not present, use the createdAt timestamp
    cache.data.headers[Header.LastModified] || new Date(cache.createdAt).toUTCString() : modifiedSince.toUTCString();
  }
}
/**
 * Creates the new date to the cache by the provided response. Also handles possible 304
 * Not Modified by updating response properties.
 */
function createCacheResponse(response, previousCache) {
  if (response.status === 304 && previousCache) {
    // Set the cache information into the response object
    response.cached = true;
    response.data = previousCache.data;
    response.status = previousCache.status;
    response.statusText = previousCache.statusText;
    // Update possible new headers
    response.headers = {
      ...previousCache.headers,
      ...response.headers
    };
    // return the old cache
    return previousCache;
  }
  // New Response
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
}

function defaultRequestInterceptor(axios) {
  const onFulfilled = async config => {
    config.id = axios.generateKey(config);
    if (config.cache === false) {
      return config;
    }
    // merge defaults with per request configuration
    config.cache = {
      ...axios.defaults.cache,
      ...config.cache
    };
    if (typeof config.cache.cachePredicate === 'object' && config.cache.cachePredicate.ignoreUrls && config.url) {
      for (const url of config.cache.cachePredicate.ignoreUrls) {
        if (url instanceof RegExp ? (
        // Handles stateful regexes
        // biome-ignore lint: reduces the number of checks
        url.lastIndex = 0, url.test(config.url)) : config.url.includes(url)) {
          return config;
        }
      }
    }
    // Applies sufficient headers to prevent other cache systems to work along with this one
    //
    // Its currently used before isMethodIn because if the isMethodIn returns false, the request
    // shouldn't be cached an therefore neither in the browser.
    if (config.cache.cacheTakeover) {
      var _config$headers, _Header$CacheControl, _config$headers$_Head, _config$headers2, _Header$Pragma, _config$headers2$_Hea, _config$headers3, _Header$Expires, _config$headers3$_Hea;
      (_config$headers$_Head = (_config$headers = config.headers)[_Header$CacheControl = Header.CacheControl]) != null ? _config$headers$_Head : _config$headers[_Header$CacheControl] = 'no-cache';
      (_config$headers2$_Hea = (_config$headers2 = config.headers)[_Header$Pragma = Header.Pragma]) != null ? _config$headers2$_Hea : _config$headers2[_Header$Pragma] = 'no-cache';
      (_config$headers3$_Hea = (_config$headers3 = config.headers)[_Header$Expires = Header.Expires]) != null ? _config$headers3$_Hea : _config$headers3[_Header$Expires] = '0';
    }
    if (!isMethodIn(config.method, config.cache.methods)) {
      return config;
    }
    // Assumes that the storage handled staled responses
    let cache = await axios.storage.get(config.id, config);
    const overrideCache = config.cache.override;
    // Not cached, continue the request, and mark it as fetching
    // biome-ignore lint/suspicious/noConfusingLabels: required to break condition in simultaneous accesses
    ignoreAndRequest: if (cache.state === 'empty' || cache.state === 'stale' || cache.state === 'must-revalidate' || overrideCache) {
      // This checks for simultaneous access to a new key. The js event loop jumps on the
      // first await statement, so the second (asynchronous call) request may have already
      // started executing.
      if (axios.waiting.has(config.id) && !overrideCache) {
        cache = await axios.storage.get(config.id, config);
        // @ts-expect-error This check is required when a request has it own cache deleted manually, lets
        // say by a `axios.storage.delete(key)` and has a concurrent loading request.
        // Because in this case, the cache will be empty and may still has a pending key
        // on waiting map.
        if (cache.state !== 'empty' && cache.state !== 'must-revalidate') {
          break ignoreAndRequest;
        }
      }
      // Create a deferred to resolve other requests for the same key when it's completed
      const def = fastDefer.deferred();
      axios.waiting.set(config.id, def);
      // Adds a default reject handler to catch when the request gets aborted without
      // others waiting for it.
      def.catch(() => undefined);
      await axios.storage.set(config.id, {
        state: 'loading',
        previous: overrideCache ?
        // Simply determine if the request is stale or not
        // based if it had previous data or not
        cache.data ? 'stale' : 'empty' :
        // Typescript doesn't know that cache.state here can only be 'empty' or 'stale'
        cache.state,
        data: cache.data,
        // If the cache is empty and asked to override it, use the current timestamp
        createdAt: overrideCache && !cache.createdAt ? Date.now() : cache.createdAt
      }, config);
      if (cache.state === 'stale' || cache.state === 'must-revalidate') {
        updateStaleRequest(cache, config);
      }
      config.validateStatus = createValidateStatus(config.validateStatus);
      // Hydrates any UI temporarily, if cache is available
      if (cache.state === 'stale' || cache.data && cache.state !== 'must-revalidate') {
        await (config.cache.hydrate == null ? void 0 : config.cache.hydrate(cache));
      }
      return config;
    }
    let cachedResponse;
    if (cache.state === 'loading') {
      const deferred = axios.waiting.get(config.id);
      // The deferred may not exists when the process is using a persistent
      // storage and cancelled  in the middle of a request, this would result in
      // a pending loading state in the storage but no current promises to resolve
      if (!deferred) {
        // Hydrates any UI temporarily, if cache is available
        if (cache.data) {
          await (config.cache.hydrate == null ? void 0 : config.cache.hydrate(cache));
        }
        return config;
      }
      try {
        // Deferred can't reuse the value because the user's storage might clone
        // or mutate the value, so we need to ask it again.
        // For example with memoryStorage + cloneData
        await deferred;
        const state = await axios.storage.get(config.id, config);
        // This is a cache mismatch and should never happen, but in case it does,
        // we need to redo the request all over again.
        /* c8 ignore start */
        if (!state.data) {
          if (false) ;
          return onFulfilled(config);
        }
        /* c8 ignore end */
        cachedResponse = state.data;
      } catch (err) {
        // Hydrates any UI temporarily, if cache is available
        /* c8 ignore start */
        if (cache.data) {
          await (config.cache.hydrate == null ? void 0 : config.cache.hydrate(cache));
        }
        /* c8 ignore end */
        // The deferred is rejected when the request that we are waiting rejects its cache.
        // In this case, we need to redo the request all over again.
        return onFulfilled(config);
      }
    } else {
      cachedResponse = cache.data;
    }
    // The cached data is already transformed after receiving the response from the server.
    // Reapplying the transformation on the transformed data will have an unintended effect.
    // Since the cached data is already in the desired format, there is no need to apply the transformation function again.
    config.transformResponse = undefined;
    // Even though the response interceptor receives this one from here,
    // it has been configured to ignore cached responses = true
    config.adapter = function cachedAdapter() {
      return Promise.resolve({
        config,
        data: cachedResponse.data,
        headers: cachedResponse.headers,
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        cached: true,
        stale: cache.previous === 'stale',
        id: config.id
      });
    };
    return config;
  };
  return {
    onFulfilled,
    apply: () => axios.interceptors.request.use(onFulfilled)
  };
}

/** Tests an response against a {@link CachePredicateObject}. */
async function testCachePredicate(response, predicate) {
  if (typeof predicate === 'function') {
    return predicate(response);
  }
  const {
    statusCheck,
    responseMatch,
    containsHeaders
  } = predicate;
  if (statusCheck && !(await statusCheck(response.status)) || responseMatch && !(await responseMatch(response))) {
    return false;
  }
  if (containsHeaders) {
    for (const [header, predicate] of Object.entries(containsHeaders)) {
      var _response$headers$hea;
      if (!(await predicate( // Avoid bugs in case the header is not in lower case
      (_response$headers$hea = response.headers[header.toLowerCase()]) != null ? _response$headers$hea : response.headers[header]))) {
        return false;
      }
    }
  }
  return true;
}

/** Function to update all caches, from CacheProperties.update, with the new data. */
async function updateCache(storage, data, cacheUpdater) {
  // Global cache update function.
  if (typeof cacheUpdater === 'function') {
    return cacheUpdater(data);
  }
  for (const [cacheKey, updater] of Object.entries(cacheUpdater)) {
    if (updater === 'delete') {
      await storage.remove(cacheKey, data.config);
      continue;
    }
    const value = await storage.get(cacheKey, data.config);
    if (value.state === 'loading') {
      continue;
    }
    const newValue = await updater(value, data);
    if (newValue === 'delete') {
      await storage.remove(cacheKey, data.config);
      continue;
    }
    if (newValue !== 'ignore') {
      await storage.set(cacheKey, newValue, data.config);
    }
  }
}

function defaultResponseInterceptor(axios) {
  /**
   * Rejects cache for an response response.
   *
   * Also update the waiting list for this key by rejecting it.
   */
  const rejectResponse = async (responseId, config, clearCache) => {
    // Updates the cache to empty to prevent infinite loading state
    if (clearCache) {
      await axios.storage.remove(responseId, config);
    }
    // Rejects the deferred, if present
    const deferred = axios.waiting.get(responseId);
    if (deferred) {
      deferred.reject();
      axios.waiting.delete(responseId);
    }
  };
  const onFulfilled = async response => {
    var _response$cached;
    // When response.config is not present, the response is indeed a error.
    if (!(response != null && response.config)) {
      // Re-throws the error
      throw response;
    }
    response.id = response.config.id;
    (_response$cached = response.cached) != null ? _response$cached : response.cached = false;
    const config = response.config;
    // Request interceptor merges defaults with per request configuration
    const cacheConfig = config.cache;
    // Response is already cached
    if (response.cached) {
      return response;
    }
    // Skip cache: either false or weird behavior
    // config.cache should always exists, at least from global config merge.
    if (!cacheConfig) {
      response.cached = false;
      return response;
    }
    // Update other entries before updating himself
    if (cacheConfig.update) {
      await updateCache(axios.storage, response, cacheConfig.update);
    }
    if (!isMethodIn(config.method, cacheConfig.methods)) {
      return response;
    }
    const cache = await axios.storage.get(response.id, config);
    if (
    // If the request interceptor had a problem or it wasn't cached
    cache.state !== 'loading') {
      return response;
    }
    // Config told that this response should be cached.
    if (
    // For 'loading' values (previous: stale), this check already ran in the past.
    !cache.data && !(await testCachePredicate(response, cacheConfig.cachePredicate))) {
      await rejectResponse(response.id, config, true);
      return response;
    }
    // Avoid remnant headers from remote server to break implementation
    for (const header of Object.keys(response.headers)) {
      if (header.startsWith('x-axios-cache')) {
        delete response.headers[header];
      }
    }
    if (cacheConfig.etag && cacheConfig.etag !== true) {
      response.headers[Header.XAxiosCacheEtag] = cacheConfig.etag;
    }
    if (cacheConfig.modifiedSince) {
      response.headers[Header.XAxiosCacheLastModified] = cacheConfig.modifiedSince === true ? 'use-cache-timestamp' : cacheConfig.modifiedSince.toUTCString();
    }
    let ttl = cacheConfig.ttl || -1; // always set from global config
    let staleTtl;
    if (cacheConfig.interpretHeader) {
      const expirationTime = axios.headerInterpreter(response.headers);
      // Cache should not be used
      if (expirationTime === 'dont cache') {
        await rejectResponse(response.id, config, true);
        return response;
      }
      if (expirationTime !== 'not enough headers') {
        if (typeof expirationTime === 'number') {
          ttl = expirationTime;
        } else {
          ttl = expirationTime.cache;
          staleTtl = expirationTime.stale;
        }
      }
    }
    const data = createCacheResponse(response, cache.data);
    if (typeof ttl === 'function') {
      ttl = await ttl(response);
    }
    if (cacheConfig.staleIfError) {
      response.headers[Header.XAxiosCacheStaleIfError] = String(ttl);
    }
    const newCache = {
      state: 'cached',
      ttl,
      staleTtl,
      createdAt: Date.now(),
      data
    };
    // Define this key as cache on the storage
    await axios.storage.set(response.id, newCache, config);
    // Resolve all other requests waiting for this response
    const waiting = axios.waiting.get(response.id);
    if (waiting) {
      waiting.resolve();
      axios.waiting.delete(response.id);
    }
    // Return the response with cached as false, because it was not cached at all
    return response;
  };
  const onRejected = async error => {
    // When response.config is not present, the response is indeed a error.
    if (!error.isAxiosError || !error.config) {
      // We should probably re-request the response to avoid an infinite loading state here
      // but, since this is an unknown error, we cannot figure out what request ID to use.
      // And the only solution is to let the storage actively reject the current loading state.
      throw error;
    }
    const config = error.config;
    const id = config.id;
    const cacheConfig = config.cache;
    const response = error.response;
    // config.cache should always exist, at least from global config merge.
    if (!cacheConfig || !id) {
      throw error;
    }
    if (!isMethodIn(config.method, cacheConfig.methods)) {
      // Rejects all other requests waiting for this response
      await rejectResponse(id, config, true);
      throw error;
    }
    const cache = await axios.storage.get(id, config);
    if (
    // This will only not be loading if the interceptor broke
    cache.state !== 'loading' || cache.previous !== 'stale') {
      // Rejects all other requests waiting for this response
      await rejectResponse(id, config,
      // Do not clear cache if this request is cached, but the request was cancelled before returning the cached response
      error.code !== 'ERR_CANCELED' || error.code === 'ERR_CANCELED' && cache.state !== 'cached');
      throw error;
    }
    if (cacheConfig.staleIfError) {
      const cacheControl = String(response == null ? void 0 : response.headers[Header.CacheControl]);
      const staleHeader = cacheControl && cacheParser.parse(cacheControl).staleIfError;
      const staleIfError = typeof cacheConfig.staleIfError === 'function' ? await cacheConfig.staleIfError(response, cache, error) : cacheConfig.staleIfError === true && staleHeader ? staleHeader * 1000 //staleIfError is in seconds
      : cacheConfig.staleIfError;
      if (staleIfError === true ||
      // staleIfError is the number of seconds that stale is allowed to be used
      typeof staleIfError === 'number' && cache.createdAt + staleIfError > Date.now()) {
        // re-mark the cache as stale
        await axios.storage.set(id, {
          state: 'stale',
          createdAt: Date.now(),
          data: cache.data
        }, config);
        // Resolve all other requests waiting for this response
        const waiting = axios.waiting.get(id);
        if (waiting) {
          waiting.resolve();
          axios.waiting.delete(id);
        }
        return {
          cached: true,
          stale: true,
          config,
          id,
          data: cache.data.data,
          headers: cache.data.headers,
          status: cache.data.status,
          statusText: cache.data.statusText
        };
      }
    }
    // Rejects all other requests waiting for this response
    await rejectResponse(id, config, true);
    throw error;
  };
  return {
    onFulfilled,
    onRejected,
    apply: () => axios.interceptors.response.use(onFulfilled, onRejected)
  };
}

/** Returns true if the provided object was created from {@link buildStorage} function. */
const isStorage = obj => !!obj && !!obj['is-storage'];
function hasUniqueIdentifierHeader(value) {
  const headers = value.data.headers;
  return Header.ETag in headers || Header.LastModified in headers || Header.XAxiosCacheEtag in headers || Header.XAxiosCacheLastModified in headers;
}
/** Returns true if value must be revalidated */
function mustRevalidate(value) {
  // Must revalidate is a special case and should not serve stale values
  // We could use cache-control's parse function, but this is way faster and simpler
  return String(value.data.headers[Header.CacheControl]).includes('must-revalidate');
}
/** Returns true if this has sufficient properties to stale instead of expire. */
function canStale(value) {
  if (hasUniqueIdentifierHeader(value)) {
    return true;
  }
  return value.state === 'cached' && value.staleTtl !== undefined &&
  // Only allow stale values after the ttl is already in the past and the staleTtl is in the future.
  // In cases that just createdAt + ttl > Date.now(), isn't enough because the staleTtl could be <= 0.
  // This logic only returns true when Date.now() is between the (createdAt + ttl) and (createdAt + ttl + staleTtl).
  // Following the example below:
  // |--createdAt--:--ttl--:---staleTtl--->
  // [        past        ][now is in here]
  Math.abs(Date.now() - (value.createdAt + value.ttl)) <= value.staleTtl;
}
/**
 * Checks if the provided cache is expired. You should also check if the cache
 * {@link canStale} and {@link mayUseStale}
 */
function isExpired(value) {
  return value.ttl !== undefined && value.createdAt + value.ttl <= Date.now();
}
/**
 * All integrated storages are wrappers around the `buildStorage` function. External
 * libraries use it and if you want to build your own, `buildStorage` is the way to go!
 *
 * The exported `buildStorage` function abstracts the storage interface and requires a
 * super simple object to build the storage.
 *
 * **Note**: You can only create an custom storage with this function.
 *
 * @example
 *
 * ```js
 * const myStorage = buildStorage({
 *   find: () => {...},
 *   set: () => {...},
 *   remove: () => {...},
 *   clear: () => {...}
 * });
 *
 * const axios = setupCache(axios, { storage: myStorage });
 * ```
 *
 * @see https://axios-cache-interceptor.js.org/guide/storages#buildstorage
 */
function buildStorage({
  set,
  find,
  remove,
  clear
}) {
  return {
    //@ts-expect-error - we don't want to expose this
    'is-storage': 1,
    set,
    remove,
    clear,
    get: async (key, config) => {
      let value = await find(key, config);
      if (!value) {
        return {
          state: 'empty'
        };
      }
      if (value.state === 'empty' || value.state === 'loading' || value.state === 'must-revalidate') {
        return value;
      }
      // Handle cached values
      if (value.state === 'cached') {
        if (!isExpired(value)) {
          return value;
        }
        // Tries to stale expired value
        if (!canStale(value)) {
          await remove(key, config);
          return {
            state: 'empty'
          };
        }
        value = {
          state: 'stale',
          createdAt: value.createdAt,
          data: value.data,
          ttl: value.staleTtl !== undefined ? value.staleTtl + value.ttl : undefined
        };
        await set(key, value, config);
        // Must revalidate is a special case and should not serve stale values
        if (mustRevalidate(value)) {
          return {
            ...value,
            state: 'must-revalidate'
          };
        }
      }
      // A second check in case the new stale value was created already expired.
      if (!isExpired(value)) {
        return value;
      }
      if (hasUniqueIdentifierHeader(value)) {
        return value;
      }
      await remove(key, config);
      return {
        state: 'empty'
      };
    }
  };
}

/* c8 ignore start */
/**
 * Clones an object using the structured clone algorithm if available, otherwise
 * it uses JSON.parse(JSON.stringify(value)).
 */
const clone =
// https://caniuse.com/mdn-api_structuredclone (10/18/2023 92.51%)
typeof structuredClone === 'function' ? structuredClone : value => JSON.parse(JSON.stringify(value));
/* c8 ignore stop */
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
function buildMemoryStorage(cloneData = false, cleanupInterval = false, maxEntries = false) {
  const storage = buildStorage({
    set: (key, value) => {
      if (maxEntries) {
        let keys = Object.keys(storage.data);
        // Tries to cleanup first
        if (keys.length >= maxEntries) {
          storage.cleanup();
          // Recalculates the keys
          keys = Object.keys(storage.data);
          // Keeps deleting until there's space
          while (keys.length >= maxEntries) {
            // There's always at least one key here, otherwise it would not be
            // in the loop.
            delete storage.data[keys.shift()];
          }
        }
      }
      // Clone the value before storing to prevent future mutations
      // from affecting cached data.
      storage.data[key] = cloneData === 'double' ? clone(value) : value;
    },
    remove: key => {
      delete storage.data[key];
    },
    find: key => {
      const value = storage.data[key];
      return cloneData && value !== undefined ? clone(value) : value;
    },
    clear: () => {
      storage.data = Object.create(null);
    }
  });
  storage.data = Object.create(null);
  // When this program gets running for more than the specified interval, there's a good
  // chance of it being a long-running process or at least have a lot of entries. Therefore,
  // "faster" loop is more important than code readability.
  storage.cleanup = () => {
    const keys = Object.keys(storage.data);
    let i = -1;
    let value;
    let key;
    // Looping forward, as older entries are more likely to be expired
    // than newer ones.
    while (++i < keys.length) {
      key = keys[i];
      value = storage.data[key];
      if (value.state === 'empty') {
        storage.remove(key);
        continue;
      }
      // If the value is expired and can't be stale, remove it
      if (value.state === 'cached' && isExpired(value) && !canStale(value)) {
        // this storage returns void.
        storage.remove(key);
      }
    }
  };
  if (cleanupInterval) {
    storage.cleaner = setInterval(storage.cleanup, cleanupInterval);
  }
  return storage;
}

// Remove first and last '/' char, if present
const SLASHES_REGEX = /^\/|\/$/g;
/**
 * Builds an generator that receives a {@link CacheRequestConfig} and returns a value
 * hashed by {@link hash}.
 *
 * The value is hashed into a signed integer when the returned value from the provided
 * generator is not a `string` or a `number`.
 *
 * You can return any type of data structure.
 *
 * @example
 *
 * ```js
 * // This generator will return a hash code.
 * // The code will only be the same if url, method and data are the same.
 * const generator = buildKeyGenerator(({ url, method, data }) => ({
 *   url,
 *   method,
 *   data
 * }));
 * ```
 */
function buildKeyGenerator(generator) {
  return request => {
    if (request.id) {
      return request.id;
    }
    const key = generator(request);
    if (typeof key === 'string' || typeof key === 'number') {
      return `${key}`;
    }
    return `${objectCode.hash(key)}`;
  };
}
const defaultKeyGenerator = buildKeyGenerator(({
  baseURL,
  url,
  method,
  params,
  data
}) => {
  // Remove trailing slashes to avoid generating different keys for the "same" final url.
  if (baseURL !== undefined) {
    baseURL = baseURL.replace(SLASHES_REGEX, '');
  } else {
    // just to have a consistent hash
    baseURL = '';
  }
  if (url !== undefined) {
    url = url.replace(SLASHES_REGEX, '');
  } else {
    // just to have a consistent hash
    url = '';
  }
  if (method !== undefined) {
    method = method.toLowerCase();
  } else {
    // just to have a consistent hash
    method = 'get';
  }
  return {
    url: baseURL + (baseURL && url ? '/' : '') + url,
    params: params,
    method: method,
    data: data
  };
});

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
function setupCache(axios, options = {}) {
  var _options$ttl, _options$etag, _options$modifiedSinc, _options$interpretHea, _options$cacheTakeove, _options$staleIfError, _options$override, _options$hydrate;
  const axiosCache = axios;
  if (axiosCache.defaults.cache) {
    throw new Error('setupCache() should be called only once');
  }
  axiosCache.storage = options.storage || buildMemoryStorage();
  if (!isStorage(axiosCache.storage)) {
    throw new Error('Use buildStorage() function');
  }
  axiosCache.waiting = options.waiting || new Map();
  axiosCache.generateKey = options.generateKey || defaultKeyGenerator;
  axiosCache.headerInterpreter = options.headerInterpreter || defaultHeaderInterpreter;
  axiosCache.requestInterceptor = options.requestInterceptor || defaultRequestInterceptor(axiosCache);
  axiosCache.responseInterceptor = options.responseInterceptor || defaultResponseInterceptor(axiosCache);
  axiosCache.debug = options.debug || function noop() {};
  // CacheRequestConfig values
  axiosCache.defaults.cache = {
    update: options.update || {},
    ttl: (_options$ttl = options.ttl) != null ? _options$ttl : 1000 * 60 * 5,
    // Although RFC 7231 also marks POST as cacheable, most users don't know that
    // and may have problems about why their "create X" route not working.
    methods: options.methods || ['get', 'head'],
    cachePredicate: options.cachePredicate || {
      // All cacheable status codes defined in RFC 7231
      statusCheck: status => [200, 203, 300, 301, 302, 404, 405, 410, 414, 501].includes(status)
    },
    etag: (_options$etag = options.etag) != null ? _options$etag : true,
    // This option is going to be ignored by servers when ETag is enabled
    // Checks strict equality to false to avoid undefined-ish values
    modifiedSince: (_options$modifiedSinc = options.modifiedSince) != null ? _options$modifiedSinc : options.etag === false,
    interpretHeader: (_options$interpretHea = options.interpretHeader) != null ? _options$interpretHea : true,
    cacheTakeover: (_options$cacheTakeove = options.cacheTakeover) != null ? _options$cacheTakeove : true,
    staleIfError: (_options$staleIfError = options.staleIfError) != null ? _options$staleIfError : true,
    override: (_options$override = options.override) != null ? _options$override : false,
    hydrate: (_options$hydrate = options.hydrate) != null ? _options$hydrate : undefined
  };
  // Apply interceptors
  axiosCache.requestInterceptor.apply();
  axiosCache.responseInterceptor.apply();
  return axiosCache;
}

/**
 * Creates a simple storage. You can persist his data by using `sessionStorage` or
 * `localStorage` with it.
 *
 * **ImplNote**: Without polyfill, this storage only works on browser environments.
 *
 * @example
 *
 * ```js
 * const fromLocalStorage = buildWebStorage(localStorage);
 * const fromSessionStorage = buildWebStorage(sessionStorage);
 *
 * const myStorage = new Storage();
 * const fromMyStorage = buildWebStorage(myStorage);
 * ```
 *
 * @param storage The type of web storage to use. localStorage or sessionStorage.
 * @param prefix The prefix to index the storage. Useful to prevent collision between
 *   multiple places using the same storage.
 */
function buildWebStorage(storage, prefix = 'axios-cache-') {
  return buildStorage({
    clear: () => {
      for (const key in storage) {
        if (key.startsWith(prefix)) {
          storage.removeItem(key);
        }
      }
    },
    find: key => {
      const json = storage.getItem(prefix + key);
      return json ? JSON.parse(json) : undefined;
    },
    remove: key => {
      storage.removeItem(prefix + key);
    },
    set: (key, value) => {
      const save = () => storage.setItem(prefix + key, JSON.stringify(value));
      try {
        return save();
      } catch (error) {
        const allValues = Object.entries(storage).filter(item => item[0].startsWith(prefix)).map(item => [item[0], JSON.parse(item[1])]);
        // Remove all expired values
        for (const value of allValues) {
          if (value[1].state === 'cached' && isExpired(value[1]) && !canStale(value[1])) {
            storage.removeItem(value[0]);
          }
        }
        // Try save again after removing expired values
        try {
          return save();
        } catch {
          // Storage still full, try removing the oldest value until it can be saved
          // Descending sort by createdAt
          const sortedItems = allValues.sort((a, b) => (a[1].createdAt || 0) - (b[1].createdAt || 0));
          for (const item of sortedItems) {
            storage.removeItem(item[0]);
            try {
              return save();
            } catch {
              // This key didn't free all the required space
            }
          }
        }
        // Clear the cache for the specified key
        storage.removeItem(prefix + key);
      }
    }
  });
}

exports.Header = Header;
exports.buildKeyGenerator = buildKeyGenerator;
exports.buildMemoryStorage = buildMemoryStorage;
exports.buildStorage = buildStorage;
exports.buildWebStorage = buildWebStorage;
exports.canStale = canStale;
exports.createCacheResponse = createCacheResponse;
exports.createValidateStatus = createValidateStatus;
exports.defaultHeaderInterpreter = defaultHeaderInterpreter;
exports.defaultKeyGenerator = defaultKeyGenerator;
exports.defaultRequestInterceptor = defaultRequestInterceptor;
exports.defaultResponseInterceptor = defaultResponseInterceptor;
exports.isExpired = isExpired;
exports.isMethodIn = isMethodIn;
exports.isStorage = isStorage;
exports.mustRevalidate = mustRevalidate;
exports.setupCache = setupCache;
exports.testCachePredicate = testCachePredicate;
exports.updateCache = updateCache;
exports.updateStaleRequest = updateStaleRequest;
//# sourceMappingURL=index.cjs.map