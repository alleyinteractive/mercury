/* eslint-disable */

import PubSub from 'pubsub-js';

/**
 * Get a meta value from Gutenberg.
 */
export function getMeta(field) {
  const currentMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');
  if (undefined === currentMeta[field]) {
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

  // Only change the value if it's different.
  if (value !== getMeta(field)) {
    wp.data.dispatch('core/editor').editPost({ meta: newMeta });
    PubSub.publish(`setMeta:${field}`, value);
  }
  return value;
}
