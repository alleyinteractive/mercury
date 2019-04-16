import { getMeta } from 'services/meta';

export default function getInitialValues(task) {
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
    } = currentField;
    const defaultValue = 'checkboxes' === type ? [] : '';

    return {
      ...acc,
      [fieldSlug]: getMeta(fieldSlug) || defaultValue,
    };
  }, {});

  return {
    'next-task-slug': nextTaskSlug,
    [`mercury_${slug}_assignee_id`]: 0,
    ...defaultFormikState,
  };
}
