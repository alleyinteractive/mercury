/* global wp */
import {
  useState,
  useEffect,
} from 'react';
import getWorkflows, {
  getWorkflow,
  getActiveWorkflowSlug,
} from 'services/workflows';

/**
 * Custom hook that manages a meta state.
 *
 * @param  {string} metaKey      Meta key in the core/editor WP store.
 * @param  {string} defaultValue Default value to populate the store if empty.
 * @return {mixed} Meta value.
 */
export default function useWorkflows() {
  const [workflows, setWorkflows] = useState(getWorkflows());

  useEffect(() => (
    wp.data.subscribe(() => {
      setWorkflows(getWorkflows());
    })
  ), []);
  return workflows;
}

/**
 * Custom hook that manages the active workflow state.
 *
 * @return {string} Active workflow slug.
 */
export function useActiveWorkflowSlug() {
  // Initialize a new state for the current workflow slug.
  const [
    activeWorkflowSlug,
    setCurrentWorkflowSlugState,
  ] = useState(getActiveWorkflowSlug());

  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
    const newSlug = getActiveWorkflowSlug();
    if (activeWorkflowSlug !== newSlug) {
      setCurrentWorkflowSlugState(newSlug);
      // @todo update active and viewing tasks when the workflow changes.
    }
  }));

  return activeWorkflowSlug;
}

/**
 * Custom hook that retrieves a workflow when the active workflow slug changes.
 *
 * @return {object} Data object for active workflow.
 */
export function useActiveWorkflow() {
  // Initialize a new state for the current workflow object.
  const activeWorkflowSlug = useActiveWorkflowSlug();
  const [
    activeWorkflow,
    setActiveWorkflow,
  ] = useState(getWorkflow(activeWorkflowSlug));

  // Retrieve workflow data when slug changes.
  useEffect(() => {
    setActiveWorkflow(getWorkflow(activeWorkflowSlug));
    return () => {};
  }, [activeWorkflowSlug]);

  return activeWorkflow;
}
