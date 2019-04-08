import React from 'react';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getWorkflow } from 'services/workflows';
import Task from 'components/task';
import TaskHeader from 'components/task/header';
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
  const task = getTask();

  return (
    <Wrapper>
      <Menu />
      {task && (
        <TaskWrapper>
          {task}
        </TaskWrapper>
      )}
      {('none' !== currentWorkflowSlug && ! task) && (
        <TaskHeader
          name="No Task Selected"
          inProgress={false}
        />
      )}
      {('none' === currentWorkflowSlug) && (
        <TaskHeader
          name="No Workflow Selected"
          inProgress={false}
        />
      )}
    </Wrapper>
  );
};

export default Workflow;
