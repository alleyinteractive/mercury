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
 * Helper to set the in progress task slug.
 *
 * @param {string} slug Slug of the active workflow.
 * @return {string} slug Updated value.
 */
export function setInProgressTaskSlug(slug) {
  if (getTask(slug)) {
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
 * Returns a function to redirect to the given parameter when
 * the editor indicates that a post save has succeeded.
 *
 * To be connected with wp.data.subscribe().
 *
 * @param {string} redirectURL URL to redirect to.
 */
const maybeRedirectOnSave = (redirectURL) => () => {
  if (! wp.data.select('core/editor').didPostSaveRequestSucceed()) {
    return;
  }

  window.location.replace(redirectURL);
};

/**
 * Complete a task and transition to a new one.
 *
 * @param  {string} currentTaskSlug Slug of the task to complete.
 * @param  {string} nextTaskSlug    Slug of the task to transition to.
 */
export function completeTask(currentTaskSlug, nextTaskSlug) {
  // Mark as complete in meta.
  setTaskStatus(currentTaskSlug, 'complete');
  setTaskStatus(nextTaskSlug, 'active');
  setPostStatus(nextTaskSlug);

  // Set the InProgress and Selected tasks to the next task.
  setInProgressTaskSlug(nextTaskSlug);
  setSelectedTaskSlug(nextTaskSlug);

  // If the current task's selected action has a redirect URL,
  // set that up to redirect after the save happens.
  const currentTask = getTask(currentTaskSlug);

  const nextTaskTransition = currentTask.nextTasks.find(
    (task) => task.slug === nextTaskSlug
  );

  if (nextTaskTransition && nextTaskTransition.redirectUrl) {
    wp.data.subscribe(maybeRedirectOnSave(nextTaskTransition.redirectUrl));
  }

  // Save the post.
  wp.data.dispatch('core/editor').savePost();
}

/**
 * Set the post status appropriately, given a task.
 *
 * @param  {string} taskSlug Slug of the task.
 */
export function setPostStatus(taskSlug) {
  wp.data.dispatch('core/editor').editPost({
    status: getTask(taskSlug).postStatus,
  });
}
