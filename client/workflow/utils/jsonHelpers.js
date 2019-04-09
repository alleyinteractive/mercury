/**
 * Check through an object and serialize any arrays or objects set as values.
 *
 * @param {object} obj - Object for which values should be serialized.
 */
export const stringifyValues = (obj) => (
  Object.keys(obj).reduce((acc, currentKey) => {
    if (
      Array.isArray(obj[currentKey])
      || 'object' === typeof curr
    ) {
      return {
        ...acc,
        [currentKey]: JSON.stringify(obj[currentKey]),
      };
    }

    return {
      ...acc,
      [currentKey]: obj[currentKey],
    };
  }, {})
);

/**
 * Convert a single value from JSON into a javascript object or array
 *
 * @param {string} val - Value to convert.
 */
export const parseValue = (val) => {
  let newVal;

  try {
    newVal = JSON.parse(val);
  } catch {
    newVal = val;
  }

  return newVal;
};
