/* eslint-disable */

import { getMeta, setMeta } from './meta';
import getWorkflows, { getActiveWorkflow, getActiveWorkflowSlug } from './workflows';

/**
 * Get a task by slug (for the current active workflow).
 *
 * @param  {string} slug Task slug.
 * @return {object|bool} Task object or false.
 */
export function getTask(slug) {
  const workflow = getActiveWorkflow();
  const task = workflow.tasks.find((task) => task.slug === slug);
  if (undefined === task) {
    return false;
  }
  return task;
}

/**
 * Set the in progress task slug to the first task in the active workflow.
 */
export function setDefaultInProgressTaskSlug() {
  return setInProgressTaskSlug(getActiveWorkflow().tasks[0].slug);
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

  // Is `taskSlug` correspond to a valid task?
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

  // Is `taskSlug` correspond to a valid task?
  if (getTask(taskSlug)) {
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
export function setSelectedTaskSlug(slug, context = 'unknown') {
  if (getTask(slug)) {
    return setMeta('mercury_selected_task_slug', slug);
  }
  return setDefaultSelectedTaskSlug();
}

/**
 * Set the status for a given task.
 *
 * @param {string} taskSlug Task slug.
 * @param {string} status   Status.
 */
export function setTaskStatus(taskSlug, status) {
  const activeWorkflowSlug = getActiveWorkflowSlug();
  setMeta(`mercury_${taskSlug}_status`, status);
}

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

  // Set the InProgress and Selected tasks to the next task.
  setInProgressTaskSlug(nextTaskSlug);
  setSelectedTaskSlug(nextTaskSlug);
}