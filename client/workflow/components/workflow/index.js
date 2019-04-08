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
    const workflow = getWorkflow(currentWorkflowSlug);
    let task = workflow.tasks
      .find((currentTask) => (currentTask.slug === currentTaskSlug));

    if (! task) {
      [task] = workflow.tasks;
    }

    if (task) {
      return task;
    }

    return false;
  };
  const task = getTask();

  return (
    <Wrapper>
      <Menu selectedTaskSlug={task ? task.slug : 'none'} />
      {task && (
        <TaskWrapper>
          <Task {...task} key={task.slug} />
        </TaskWrapper>
      )}
      {('none' !== currentWorkflowSlug && ! task) && (
        <TaskHeader name="No Task Selected" />
      )}
      {('none' === currentWorkflowSlug) && (
        <TaskHeader name="No Workflow Selected" />
      )}
    </Wrapper>
  );
};

export default Workflow;
