import { sortNumbers } from './util';

/**
 * Hashes a given value into a unique number.
 *
 * This function accepts **ANY** kind of value, like `functions`, `classes`, `objects` and
 * so on.
 *
 * **Note**: Symbols uniqueness are not guaranteed, as they are transformed to strings.
 *
 * @example
 *
 * ```ts
 * class B {}
 *
 * const bHash = hash(B);
 * const bInstanceHash = hash(new B());
 * const bArrayHash = hash([B, new B(), new B(), { b: new B() }]);
 * const bBuilderHash = hash(() => B);
 * const bFactoryHash = hash(() => new B());
 * ```
 *
 * @param val The value to be hashed
 * @returns The signed integer result from the provided value
 * @see https://tinylibs.js.org/packages/object-code/
 */
export function hash(val: unknown, seen?: WeakSet<object>): number {
  let h = 5381;

  // Objects should be recursively hashed
  if (
    typeof val === 'object' &&
    val !== null &&
    (val.toString === Object.prototype.toString ||
      val.toString === Array.prototype.toString)
  ) {
    if (!seen) {
      seen = new WeakSet();
    }

    // Sort keys to keep the hash consistent
    const keys = Object.keys(val).sort(sortNumbers);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = val[key as keyof typeof val] as object;

      h = (h * 33) ^ hash(key, seen);

      // Uses an internal WeakMap to keep track of previous seen values
      // and avoid circular references serializations which would cause
      // an infinite loop.
      if (
        typeof value === 'object' &&
        value !== null &&
        (val.toString === Object.prototype.toString ||
          val.toString === Array.prototype.toString)
      ) {
        if (seen.has(value)) {
          continue;
        }

        seen.add(value);
      }

      // Hashes the value
      h = (h * 33) ^ hash(value, seen);
    }

    // Also hashes the constructor
    h = (h * 33) ^ hash(val.constructor, seen);

    return h;
  }

  let toHash = typeof val;

  try {
    if (val instanceof Date) {
      toHash += val.getTime();
    } else {
      toHash += String(val);
    }
  } catch (error) {
    toHash += String(Object.assign({}, val));
  }

  for (let i = 0; i < toHash.length; i++) {
    h = (h * 33) ^ toHash.charCodeAt(i);
  }

  return h;
}
