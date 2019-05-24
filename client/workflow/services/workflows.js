/* global wp */
import { getMeta, setMeta } from './meta';
import { setInProgressTaskSlug } from './tasks'; // eslint-disable-line import/no-cycle

const { select } = wp.data;

/**
 * Get the workflows from the custom mercury/workflows data store.
 */
export function getWorkflow(slug) {
  return wp.data.select('mercury/workflows').getWorkflow(slug);
}

/**
 * Set the active workflow slug to the first workflow in the list of workflows.
 */
export function setDefaultActiveWorkflowSlug() {
  const defaultWorkflow = select('mercury/workflows').requestWorkflows()[0];
  setMeta(
    'mercury_in_progress_task_slug',
    defaultWorkflow.tasks[0].slug
  );
  return setMeta('mercury_active_workflow_slug', defaultWorkflow.slug);
}

/**
 * Get the active workflow.
 *
 * @return {object} Workflow object.
 */
export function getActiveWorkflow() {
  return getWorkflow(getActiveWorkflowSlug());
}

/**
 * Get the active workflow slug, or fallback to the first workflow.
 *
 * @return {string} Active workflow slug.
 */
export function getActiveWorkflowSlug() {
  const workflowSlug = getMeta('mercury_active_workflow_slug');

  // Is `workflowSlug` correspond to a valid workflow?
  if ('none' === workflowSlug || getWorkflow(workflowSlug)) {
    return workflowSlug;
  }

  return setDefaultActiveWorkflowSlug();
}

/**
 * Helper to set the active workflow slug.
 *
 * @param {string} slug Slug of the active workflow.
 * @return {string} slug Updated value.
 */
export function setActiveWorkflowSlug(slug) {
  const soonToBeActiveWorkflow = getWorkflow(slug);
  // Ensure the slug is a real workflow.
  if ('none' === slug || soonToBeActiveWorkflow) {
    if ('none' !== slug) {
      setInProgressTaskSlug(soonToBeActiveWorkflow.tasks[0].slug);
    }
    return setMeta('mercury_active_workflow_slug', slug);
  }
  return setDefaultActiveWorkflowSlug();
}
