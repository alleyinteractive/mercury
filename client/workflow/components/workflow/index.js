import React from 'react';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { getWorkflow } from 'services/workflows';
import Task from 'components/task';
import SelectWorkflow from './selectWorkflow';
import TaskPanel from './taskPanel';
import {
  Wrapper,
  TasksPanel,
  TaskWrapper,
} from './workflowStyles.js';

const Workflow = () => {
  const currentWorkflowSlug = useActiveWorkflowSlug();

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTaskPanels = () => (
    getWorkflow(currentWorkflowSlug).tasks.map((task) => {
      const { slug } = task;

      return <TaskPanel {...task} key={slug} />;
    })
  );

  return (
    <div>
      <SelectWorkflow />
      <Wrapper>
        <TasksPanel>
          {getTaskPanels()}
        </TasksPanel>
        <TaskWrapper>
          <Task />
        </TaskWrapper>
      </Wrapper>
    </div>
  );
};

export default Workflow;
