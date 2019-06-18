import {
  stringifyValues,
  stringifyValue,
  parseValue,
} from 'utils/formValueHelpers';
import { getAssignee } from 'services/users';

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
     * Hook fired before meta is set to allow modification before setting the value.
     *
     * @param {mixed} [value] New value for this field.
     * @param {mixed} [oldValue] Old value for this field.
     * @param {string} [field] Key of the field.
     * @type {mixed}
     */
    const newValue = hooks.applyFilters(
      'mercury.preSetMeta',
      value,
      oldValue,
      field,
    );

    const newMeta = {
      [field]: stringifyValue(newValue),
    };

    wp.data.dispatch('core/editor').editPost({
      meta: newMeta,
    });

    /**
     * Hook fired after meta is set to perform logic as a response.
     *
     * @param {mixed} [newValue] New value for this field.
     * @param {string} [field] Key of the field.
     * @type {mixed}
     */
    hooks.applyFilters(
      'mercury.postSetMeta',
      newValue,
      field
    );
  }

  return value;
}

/**
 * Get values from meta for a given task in order to initialize Formik with the correct data.
 *
 * @param {string} task Task object for which data should be retrieved.
 */
export function getInitialValues(task) {
  const {
    nextTasks,
    fields,
    slug,
  } = task;
  const nextTaskSlug = nextTasks.length ? nextTasks[0].slug : '';
  const defaultFormikState = fields.reduce((acc, currentField) => {
    const {
      slug: fieldSlug,
      type,
      defaultValue,
    } = currentField;

    const emptyValue = 'checkboxes' === type ? [] : '';

    return {
      ...acc,
      [fieldSlug]: getMeta(fieldSlug) || defaultValue || emptyValue,
    };
  }, {});

  return {
    'next-task-slug': nextTaskSlug,
    [`mercury_${slug}_assignee_id`]: getAssignee(slug),
    ...defaultFormikState,
  };
}
