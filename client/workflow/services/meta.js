import {
  stringifyValues,
  stringifyValue,
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
 * Save an object of meta values from Gutenberg.
 *
 * @param {object} meta Object containing multiple meta values to set.
 */
export function setMetaGroup(meta) {
  // Update meta object wholesale.
  const newMeta = meta;
  const oldMeta = wp.data.select('core/editor')
    .getEditedPostAttribute('meta');

  if (! isEqual(oldMeta, newMeta)) {
    wp.data.dispatch('core/editor')
      .editPost({ meta: stringifyValues(newMeta) });
  }

  return meta;
}

/**
 * Save a meta value from Gutenberg.
 *
 * @param {string} field Meta field for which to set a new value.
 * @param {string} value New value for meta field.
 */
export function setMeta(field, value) {
  const { hooks } = wp;
  const oldValue = getMeta(field);

  // Only update if value has changed.
  if (value !== oldValue) {
    /**
     * Hook when meta is set.
     *
     * @param {mixed} [value] New value for this field.
     * @param {mixed} [oldValue] Old value for this field.
     * @param {string} [field] Key of the field.
     * @type {mixed}
     */
    const newValue = hooks.applyFilters(
      'mercurySetMeta',
      value,
      oldValue,
      field
    );

    const newMeta = {
      [field]: stringifyValue(newValue),
    };

    wp.data.dispatch('core/editor').editPost({ meta: newMeta });
  }

  return value;
}
