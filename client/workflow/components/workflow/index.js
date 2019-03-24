/* eslint-disable */

import React from 'react';
import useMeta from '../../hooks/meta';
import { useActiveWorkflowSlug } from '../../hooks/workflows';
import { getActiveWorkflow } from '../../services/workflows';
import { useInProgressTaskSlug, useSelectedTaskSlug } from '../../hooks/tasks';
import SelectWorkflow from './selectWorkflow';
import TaskPanel from './taskPanel';
import Task from '../task';
import './workflow.css';

const Workflow = () => {
  const currentWorkflowSlug = useActiveWorkflowSlug();
  const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();

  /**
   * Get the TaskPanel components for the current workflow.
   *
   * @return {array} TaskPanels.
   */
  const getTaskPanels = () => {
    return getActiveWorkflow().tasks.map((task) =>
      <TaskPanel
        {...task}
        isInProgress={inProgressTaskSlug === task.slug}
        isSelected={selectedTaskSlug === task.slug}
      />
    );
  }

  return (
    <div>
      <SelectWorkflow/>
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
