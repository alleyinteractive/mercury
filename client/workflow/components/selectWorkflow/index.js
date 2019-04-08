import React from 'react';
import { useActiveWorkflowSlug } from '../../hooks/workflows';
import getWorkflows, { setActiveWorkflowSlug } from '../../services/workflows';
import Wrapper from './selectWorkflowStyles.js';

const SelectWorkflow = () => {
  const workflowSlug = useActiveWorkflowSlug();

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default SelectWorkflow;
