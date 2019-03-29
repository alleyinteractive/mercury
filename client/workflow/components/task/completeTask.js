/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useInProgressTaskSlug, useSelectedTaskSlug } from '../../hooks/tasks';
import { getTask, completeTask } from '../../services/tasks';
import './completeTask.css';

const CompleteTask = (props) => {
  // Watch for changes to the in progress and selected tasks.
  const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();
  const selectedTask = getTask(selectedTaskSlug);

  // Next task state.
  const {
    name,
    slug,
    nextTasks,
  } = selectedTask;

  const [ nextTaskSlug, setNextTaskSlug ] = useState(nextTasks[0].slug);

  useEffect(() => {
    const selectedTask = getTask(selectedTaskSlug);
    setNextTaskSlug(selectedTask.nextTasks[0].slug);
  }, selectedTaskSlug);

  const getButtonLabel = () => {
    if (1 === nextTasks.length) {
      return nextTasks[0].label;
    }
    return 'Complete Task';
  }

  return (
    <div className="mercury__complete-task">
      {1 < nextTasks.length &&
        <label
          htmlFor="next-task"
        >
          <select
            id="next-task"
            name="next-task"
            onChange={(event) => setNextTaskSlug(event.target.value)}
            value={nextTaskSlug}
            disabled={inProgressTaskSlug !== selectedTaskSlug}
          >
            {nextTasks.map((task) => <option value={task.slug}>{task.label}</option>)}
          </select>
        </label>
      }
      <button
        type="button"
        onClick={() => completeTask( selectedTask, nextTaskSlug)}
        disabled={inProgressTaskSlug !== selectedTaskSlug}
      >
        {getButtonLabel()}
      </button>
    </div>
  );
};

export default CompleteTask;
