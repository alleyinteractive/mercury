import { task as defaultTaskState } from 'config/defaultState';
import { getMeta, setMeta } from './meta';
import { getActiveWorkflow } from './workflows'; // eslint-disable-line import/no-cycle

/**
 * Get a task by slug (for the current active workflow).
 *
 * @param  {string} slug Task slug.
 * @return {object|bool} Task object or false.
 */
export function getTask(slug) {
  const workflow = getActiveWorkflow();
  const task = workflow.tasks.find(
    (workflowTask) => workflowTask.slug === slug
  );
  if (undefined === task) {
    return defaultTaskState;
  }
  return task;
}

/**
 * Set the in progress task slug to the first task in the active workflow.
 */
export function setDefaultInProgressTaskSlug() {
  return setMeta(
    'mercury_in_progress_task_slug',
    getActiveWorkflow().tasks[0].slug
  );
}

/**
 * Get the in progress task.
 *
 * @return {object} Task object.
 */
export function getInProgressTask() {
  return getTask(getInProgressTaskSlug());
}

/**
 * Get the in progress task slug, or fallback to the first task in the current workflow.
 *
 * @return {string} Active workflow slug.
 */
export function getInProgressTaskSlug() {
  const taskSlug = getMeta('mercury_in_progress_task_slug');

  // Does `taskSlug` correspond to a valid task?
  if (getTask(taskSlug)) {
    return taskSlug;
  }

  return setDefaultInProgressTaskSlug();
}

/**
 * Helper to set a task's default assignee value, if
 * an assignee hasn't already been set.
 *
 * @param {string} slug Slug of the active workflow.
 * @return {string} slug Updated value.
 */
export function maybeSetTaskDefaultAssignee(slug) {
  // Return if no slug is passed.
  if (! slug) {
    return null;
  }

  // Return if we don't need to set a default.
  if (getMeta(`mercury_${slug}_assignee_id`)) {
    return null;
  }

  // Get the task data, and find the default assignee.
  const task = getTask(slug);

  if (! task) {
    return null;
  }

  const { defaultAssignee } = task.assignees;

  if (! defaultAssignee) {
    return null;
  }

  switch (defaultAssignee) {
    case 'self':
      // Note: this localized data can be removed in WP 5.3,
      // and replaced with:
      // `wp.data.select('core').getCurrentUser()`
      return setMeta(
        `mercury_${slug}_assignee_id`,
        window.mercurySettings.currentUser.ID || null
      );

    case 'author':
      return setMeta(
        `mercury_${slug}_assignee_id`,
        wp.data.select('core/editor').getCurrentPostAttribute('author') || null
      );

    case 'user':
      return setMeta(
        `mercury_${slug}_assignee_id`,
        task.assignees.defaultUser || null
      );

    case 'group':
      return setMeta(
        `mercury_${slug}_assignee_id`,
        task.assignees.defaultGroup || null
      );

    case 'none':
    default:
      break;
  }

  return null;
}

/**
 * Helper to set the in progress task slug.
 *
 * @param {string} slug Slug of the active workflow.
 * @return {string} slug Updated value.
 */
export function setInProgressTaskSlug(slug) {
  if (getTask(slug)) {
    maybeSetTaskDefaultAssignee(slug);
    return setMeta('mercury_in_progress_task_slug', slug);
  }
  return setDefaultInProgressTaskSlug();
}

/**
 * Set the selected task slug as the in progress task slug.
 */
export function setDefaultSelectedTaskSlug() {
  return setSelectedTaskSlug(getInProgressTaskSlug(), 'default setting');
}

/**
 * Get the selected task.
 *
 * @return {object} Task object.
 */
export function getSelectedTask() {
  return getTask(getSelectedTaskSlug());
}

/**
 * Get the selected task slug, or fallback to the first task in the current workflow.
 *
 * @return {string} Active workflow slug.
 */
export function getSelectedTaskSlug() {
  const taskSlug = getMeta('mercury_selected_task_slug');

  // Does `taskSlug` correspond to a valid task?
  if (getTask(taskSlug).slug || 'none' === taskSlug) {
    return taskSlug;
  }

  return setDefaultSelectedTaskSlug();
}

/**
 * Helper to set the selected task slug.
 *
 * @param {string} slug Slug of the active workflow.
 * @return {string} slug Updated value.
 */
export function setSelectedTaskSlug(slug) {
  if (getTask(slug) || 'none' === slug) {
    return setMeta('mercury_selected_task_slug', slug);
  }
  return setDefaultSelectedTaskSlug();
}

/**
 * Set the status for a given task.
 *
 * @param {string} taskSlug Task slug.
 * @param {string} status   Status, either "active" or "complete".
 */
export function setTaskStatus(taskSlug, status) {
  setMeta(`mercury_${taskSlug}_status`, status);
}

/**
 * Complete a task and transition to a new one.
 *
 * @param  {string} currentTaskSlug Slug of the task to complete.
 * @param  {string} nextTaskSlug    Slug of the task to transition to.
 */
export function completeTask(currentTaskSlug, nextTaskSlug) {
  const { hooks } = wp;

  // Update the post status.
  setPostStatus(nextTaskSlug);

  // Mark as complete in meta.
  setTaskStatus(currentTaskSlug, 'complete');
  setTaskStatus(nextTaskSlug, 'active');

  // Set the InProgress and Selected tasks to the next task.
  setInProgressTaskSlug(nextTaskSlug);
  setSelectedTaskSlug(nextTaskSlug);

  /**
   * Action fired as a task is completing.
   *
   * @param {object} [currentTask] Task completing.
   * @param {object} [nextTask].   Next task.
   */
  hooks.doAction(
    'mercuryCompletedTask',
    getTask(currentTaskSlug),
    getTask(nextTaskSlug)
  );

  // Save the post.
  wp.data.dispatch('core/editor').savePost();
}

/**
 * Get actual slug of the Task.
 *
 * eg.: nutrition-copy-edit__label-of-the-action turns into
 * nutrition-copy-edit
 *
 * @param  {string} nextTaskSlug    Slug of the task.
 */
export function getNextTaskActualSlug(nextTaskSlug) {
  return nextTaskSlug.replace(/__.*/gi, '');
}

/**
 * Set the post status appropriately, given a task.
 *
 * @param  {string} taskSlug Slug of the task.
 */
export function setPostStatus(taskSlug) {
  const currentStatus = wp.data.select('core/editor')
    .getCurrentPostAttribute('status');
  const taskStatus = getTask(taskSlug).postStatus;

  if (currentStatus !== taskStatus) {
    wp.data.dispatch('core/editor').editPost({
      status: taskStatus,
    });
  }
}
