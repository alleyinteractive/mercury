/* eslint-disable */

import React from 'react';
import useMeta from '../../hooks/meta';
import { useActiveWorkflowSlug } from '../../hooks/workflows';
import { getWorkflow } from '../../services/workflows';
import { getSelectedTask } from '../../services/tasks';
import SelectWorkflow from './selectWorkflow';
import TaskPanel from './taskPanel';
import Task from '../task';
import './workflow.css';

const Workflow = () => {
  const currentWorkflowSlug = useActiveWorkflowSlug();

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTaskPanels = () => {
    return getWorkflow(currentWorkflowSlug).tasks.map((task) =>
      <TaskPanel {...task} />
    );
  }

  return (
    <div>
      <SelectWorkflow/>
      {currentWorkflowSlug}
      <div className="mercury__wrapper">
        <aside className="mercury__tasks-panel">
          {getTaskPanels()}
        </aside>
        <section className="mercury__task__wrapper">
          <Task/>
        </section>
      </div>
    </div>
  );
};

export default Workflow;
