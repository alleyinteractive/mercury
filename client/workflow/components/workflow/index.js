import React from 'react';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getWorkflow } from 'services/workflows';
import Task from 'components/task';
import Menu from 'components/menu';
import {
  Wrapper,
  TaskWrapper,
} from './workflowStyles.js';

const Workflow = () => {
  const currentWorkflowSlug = useActiveWorkflowSlug();
  const currentTaskSlug = useSelectedTaskSlug();

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTask = () => {
    const task = getWorkflow(currentWorkflowSlug).tasks
      .find((currentTask) => (currentTask.slug === currentTaskSlug));

    if (task) {
      return <Task {...task} key={task.slug} />;
    }

    return false;
  };

  return (
    <Wrapper>
      <Menu />
      <TaskWrapper>
        {getTask()}
      </TaskWrapper>
    </Wrapper>
  );
};

export default Workflow;
