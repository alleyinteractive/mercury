import {
  stringifyValues,
  parseValue,
} from 'utils/jsonHelpers';

const { isEqual } = lodash;

/**
 * Get a meta value from Gutenberg.
 */
export function getMeta(field) {
  const currentMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');
  if (! currentMeta[field]) {
    return '';
  }
  return parseValue(currentMeta[field]);
}

/**
 * Save a meta value from Gutenberg.
 */
export function setMeta(field, value = false) {
  if (! value && 'object' === typeof field) {
    // Update meta object wholesale.
    const newMeta = field;
    const oldMeta = wp.data.select('core/editor')
      .getEditedPostAttribute('meta');

    if (! isEqual(oldMeta, newMeta)) {
      wp.data.dispatch('core/editor')
        .editPost({ meta: stringifyValues(newMeta) });
    }
  } else {
    // Update a single value in the meta object.
    const newMeta = {
      [field]: value,
    };

    if (value !== getMeta(field)) {
      wp.data.dispatch('core/editor').editPost({ meta: newMeta });
    }
  }

  return value;
}
