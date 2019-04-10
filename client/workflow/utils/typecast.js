/* eslint-disable no-else-return */

/**
 * Attempt to convert a value into a regular javascript type.
 *
 * @param {mixed} val Value to convert.
 */
export default function typecast(val) {
  const newVal = val.trim().replace(/(^['"]|['"]$)/g, '');

  if (/^\d+$/.test(newVal)) {
    return parseInt(newVal, 10);
  } else if (/^\d+\.\d+$/.test(newVal)) {
    return parseFloat(newVal);
  } else if (/^(true|false)$/.test(newVal)) {
    return ('true' === newVal);
  } else if (/^undefined$/.test(newVal)) {
    return undefined;
  } else if (/^null$/i.test(newVal)) {
    return null;
  }

  return newVal;
}
