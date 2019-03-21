/**
 * Get a meta value from Gutenberg.
 */
export function getMeta(field) {
  const currentMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');
  return currentMeta[field];
}

/**
 * Save a meta value from Gutenberg.
 */
export function setMeta(field, value) {
  const newMeta = {};
  newMeta[field] = value;
  return wp.data.dispatch('core/editor').editPost({ meta: newMeta });
}
