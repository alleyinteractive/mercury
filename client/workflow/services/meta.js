/* eslint-disable */
/**
 * Get a meta value from Gutenberg.
 */
export function getMeta(field) {
  const currentMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');
  console.log('getMeta (field, currentMeta): ', field, currentMeta);
  if (undefined === currentMeta[field]) {
    console.log('Undefined getMeta for ', field);
    return '';
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
