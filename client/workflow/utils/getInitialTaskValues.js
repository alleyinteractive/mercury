import { getMeta } from 'services/meta';
import { getAssignee } from 'services/users';

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
