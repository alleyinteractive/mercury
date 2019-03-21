import React, { useState, useEffect } from 'react';
import Workflow from '../Workflow';
import { getMeta, setMeta } from '../../services/fieldHelpers';
import getWorkflows from '../../services/workflows';

const App = () => {
  // Initialize our state.
  const [workflows, setWorkflows] = useState([]);
  const [
    workflowSlug,
    setWorkflowSlug,
  ] = useState(getMeta('mercury_active_workflow_slug'));

  /**
   * Get a workflow by slug.
   *
   * @param  {string} workflowSlug Workflow slug.
   * @return {object}              Workflow object.
   */
  const getWorkflowBySlug = (slug) => workflows
    .find((workflow) => workflow.slug === slug);

  /**
   * Get the current workflow.
   *
   * @return {object} Workflow object.
   */
  const getCurrentWorkflow = () => getWorkflowBySlug(workflowSlug);

  // Load workflows
  useEffect(() => {
    getWorkflows(setWorkflows);
  }, []);

  // Watch for workflow changes.
  useEffect(() => {
    // Ensure worflows is valid.
    if (0 === workflows.length) {
      return;
    }

    // Check if the workflowSlug is valid for this workflow.
    if (getWorkflowBySlug(workflowSlug)) {
      return;
    }

    // Data was invalid, so use the first workflow.
    setWorkflowSlug(workflows[0].slug);
    setMeta('mercury_active_workflow_slug', workflows[0].slug);
  }, [workflows]);

  // Workflows haven't loaded.
  if (0 === workflows.length || ! getCurrentWorkflow()) {
    return (
      <div>Loading Workflows</div>
    );
  }

  return (
    <Workflow
      {...getCurrentWorkflow()}
      workflows={workflows}
    />
  );
};

export default App;
