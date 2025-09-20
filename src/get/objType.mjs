/**
 * Returns the detected type name of a given value based on predefined type validators.
 *
 * This function uses `getType` with a predefined `typeValidator` to determine or compare types safely.
 * in the specified `typeValidator.order`. The first matching type is returned.
 *
 * If `val` is `null`, it immediately returns `'null'`.
 * If no match is found, it returns `'unknown'`.
 *
 * @param {any} val - The value whose type should be determined.
 * @returns {string} - The type name of the value (e.g., "array", "date", "map"), or "unknown" if no match is found.
 *
 * @example
 * getType([]); // "array"
 * getType(null); // "null"
 * getType(new Set()); // "set"
 * getType(() => {}); // "unknown"
 */
const getType = (val) => {
  if (val === null) return 'null';
  // @ts-ignore
  for (const name of typeValidator.order) {
    // @ts-ignore
    if (typeof typeValidator.items[name] !== 'function' || typeValidator.items[name](val))
      return name;
  }
  return 'unknown';
};

/**
 * Checks the type of a given object or returns its type as a string.
 *
 * @param {*} obj - The object to check or identify.
 * @param {string} [type] - Optional. If provided, checks whether the object matches this type (e.g., "object", "array", "string").
 * @returns {boolean|string|null} - Returns `true` if the type matches, `false` if not,
 *                                   the type string if no type is provided, or `null` if the object is `undefined`.
 *
 * @example
 * objType([], 'array'); // true
 * objType({}, 'object'); // true
 * objType('hello'); // "string"
 * objType(undefined); // null
 */
export default function objType(obj, type) {
  if (typeof obj === 'undefined') return null;
  const result = getType(obj);
  if (typeof type === 'string') return result === type.toLowerCase();
  return result;
}