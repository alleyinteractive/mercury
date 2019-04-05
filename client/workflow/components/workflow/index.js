import React from 'react';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { getWorkflow } from 'services/workflows';
import Task from 'components/task';
import Menu from 'components/menu';
import {
  Wrapper,
  TaskWrapper,
} from './workflowStyles.js';

const Workflow = () => {
  const currentWorkflowSlug = useActiveWorkflowSlug();

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTasks = () => (
    getWorkflow(currentWorkflowSlug).tasks.map((task) => {
      const { slug } = task;

      return <Task {...task} key={slug} />;
    })
  );

  return (
    <Wrapper>
      <Menu />
      <TaskWrapper>
        {getTasks()}
      </TaskWrapper>
    </Wrapper>
  );
};

export default Workflow;
