import React from 'react';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { getWorkflow } from 'services/workflows';
import Task from 'components/task';
import SelectWorkflow from './selectWorkflow';
import TaskPanel from './taskPanel';
import './workflow.css';

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
      <div className="mercury__wrapper">
        <aside className="mercury__tasks-panel">
          {getTaskPanels()}
        </aside>
        <section className="mercury__task__wrapper">
          <Task />
        </section>
      </div>
    </div>
  );
};

export default Workflow;
