import { getMeta } from 'services/meta';

export default function getInitialValues(fields, nextTasks) {
  const nextTaskSlug = nextTasks.length ? nextTasks[0].slug : '';
  const formikFieldState = fields.reduce((acc, currentField) => {
    const {
      slug: fieldSlug,
      type,
    } = currentField;
    const defaultValue = 'checkboxes' === type ? [] : '';

    return {
      ...acc,
      [fieldSlug]: getMeta(fieldSlug) || defaultValue,
    };
  }, {});

  return {
    'next-task-slug': nextTaskSlug,
    ...formikFieldState,
  };
}
