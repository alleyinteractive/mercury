import React from 'react';
import { useActiveWorkflowSlug } from '../../hooks/workflows';
import getWorkflows, { setActiveWorkflowSlug } from '../../services/workflows';
import './selectWorkflow.css';

const SelectWorkflow = () => {
  const workflowSlug = useActiveWorkflowSlug();

  return (
    <div className="mercury__select__workflow">
      <select
        value={workflowSlug}
        onChange={(event) => setActiveWorkflowSlug(event.target.value)}
      >
        {getWorkflows().map((workflow) => {
          const { name, slug } = workflow;

          return (
            <option value={slug} key={slug}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectWorkflow;
