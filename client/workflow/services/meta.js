/* eslint-disable */
/**
 * Get a meta value from Gutenberg.
 */
export function getMeta(field, defaultValue) {
  const currentMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');
  if (undefined === currentMeta[field]) {
    console.log('usingDefault: ', currentMeta[field]);
    setMeta(field, defaultValue);
    return defaultValue;
  }
  return currentMeta[field];
}

/**
 * Save a meta value from Gutenberg.
 */
export function setMeta(field, value) {
  const newMeta = {};
  newMeta[field] = value;
  wp.data.dispatch('core/editor').editPost({ meta: newMeta });
  return value;
}
