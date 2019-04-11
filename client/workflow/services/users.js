/* global wp */
import { getMeta, setMeta } from 'services/meta';
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

  if (currentAssignee) {
    return currentAssignee;
  }

  return setDefaultAssignee(taskSlug);
}

/**
 * Set the default assignee.
 *
 * @param {string} taskSlug Task slug.
 */
export function setDefaultAssignee(taskSlug) {
  const task = getTask(taskSlug);

  // Determine the default assignee.
  let defaultUserId = null;
  switch (task.assignees.defaultAssignee) {
    case 'self':
      // @todo get current user ID.
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
      defaultUserId = null;
  }

  // Set the default assignee.
  if (defaultUserId) {
    return setMeta(`mercury_${taskSlug}_assignee_id`, defaultUserId);
  }

  return null;
}
