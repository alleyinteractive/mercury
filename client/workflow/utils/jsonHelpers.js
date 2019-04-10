import typecast from './typecast';

/**
 * Check through an object and serialize any arrays or objects set as values.
 *
 * @param {object} obj - Object for which values should be serialized.
 */
export const stringifyValues = (obj) => (
  Object.keys(obj).reduce((acc, currentKey) => {
    let newVal;

    try {
      newVal = JSON.stringify(obj[currentKey]);
    } catch {
      newVal = obj[currentKey];
    }

    return {
      ...acc,
      [currentKey]: newVal,
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
    newVal = typecast(val);
  }

  return newVal;
};
