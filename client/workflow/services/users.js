/* global wp */
import { getMeta } from 'services/meta';
import { getTask } from 'services/tasks';

const { select } = wp.data;

/**
 * Get the assignee for a task.
 *
 * @param {string} taskSlug Task slug.
 */
export function getAssignee(taskSlug) {
  const currentAssignee = getMeta(`mercury_${taskSlug}_assignee_id`);
  return currentAssignee || getDefaultAssigneeId(taskSlug);
}

/**
 * Set the default assignee.
 *
 * @param {string} taskSlug Task slug.
 */
export function getDefaultAssigneeId(taskSlug) {
  const task = getTask(taskSlug);

  // Determine the default assignee.
  let defaultUserId = null;
  switch (task.assignees.defaultAssignee) {
    case 'self':
      defaultUserId = select('mercury/workflows').requestUser().id;
      break;
    case 'author':
      defaultUserId = wp.data.select('core/editor')
        .getCurrentPostAttribute('author');
      break;
    case 'user':
      defaultUserId = task.assignees.defaultUser;
      break;
    case 'none':
    default:
      defaultUserId = '';
  }

  return defaultUserId;
}
