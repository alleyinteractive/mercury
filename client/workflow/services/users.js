/* global wp */
import { getMeta } from 'services/meta';
import { getTask } from 'services/tasks';

/**
 * Get the current user from the mercury/workflows data store.
 */
export default function getUser() {
  return wp.data.select('mercury/workflows').receiveUser();
}

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
      defaultUserId = getUser().id;
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
