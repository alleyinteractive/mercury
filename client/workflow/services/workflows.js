/* global wp */
/* eslint-disable */

import { getMeta, setMeta } from './meta';
import { setInProgressTaskSlug } from './tasks';

/**
 * Get the workflows from the custom mercury/workflows data store.
 */
export default function getWorkflows() {
  return wp.data.select('mercury/workflows').receiveWorkflows();
}

/**
 * Get a workflow by slug.
 *
 * @param  {string} slug Workflow slug.
 * @return {object|bool} Workflow object or false.
 */
export function getWorkflow(slug) {
	const workflow = getWorkflows().find((workflow) => workflow.slug === slug);
	if (undefined === workflow) {
		return false;
	}
	return workflow;
}

/**
 * Set the active workflow slug to the first workflow in the list of workflows.
 */
export function setDefaultActiveWorkflowSlug() {
  const defaultWorkflow = getWorkflows()[0];
  console.log('setInProgressTaskSlug', defaultWorkflow);
  setInProgressTaskSlug(defaultWorkflow.tasks[0].slug);
  return setActiveWorkflowSlug(defaultWorkflow.slug);
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
  if (getWorkflow(workflowSlug)) {
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
  if (soonToBeActiveWorkflow) {
    console.log('setInProgressTaskSlug', soonToBeActiveWorkflow);
    setInProgressTaskSlug(soonToBeActiveWorkflow.tasks[0].slug);
    return setMeta('mercury_active_workflow_slug', slug);
  }
  return setDefaultActiveWorkflowSlug();
}