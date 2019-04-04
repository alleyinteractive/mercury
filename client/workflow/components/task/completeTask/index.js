import React, { useState, useEffect } from 'react';
import { useInProgressTaskSlug, useSelectedTaskSlug } from 'hooks/tasks';
import { getTask, completeTask } from 'services/tasks';
import Wrapper from './completeTaskStyles';

const CompleteTask = () => {
  // Watch for changes to the in progress and selected tasks.
  const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();
  const [
    selectedTask,
    setSelectedTask,
  ] = useState(getTask(selectedTaskSlug));
  const { nextTasks } = selectedTask;
  const [
    nextTaskSlug,
    setNextTaskSlug,
  ] = useState(nextTasks.length ? nextTasks[0].slug : '');

  useEffect(() => {
    setSelectedTask(getTask(selectedTaskSlug));
  }, [selectedTaskSlug]);

  const getButtonLabel = () => {
    if (1 === nextTasks.length) {
      return nextTasks[0].label;
    }
    return 'Complete Task';
  };

  return (
    <Wrapper>
      {1 < nextTasks.length && (
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
            {nextTasks.map((task) => {
              const { slug, label } = task;
              return <option value={slug} key={slug}>{label}</option>;
            })}
          </select>
        </label>
      )}
      <button
        type="button"
        onClick={() => completeTask(selectedTask, nextTaskSlug)}
        disabled={inProgressTaskSlug !== selectedTaskSlug}
      >
        {getButtonLabel()}
      </button>
    </Wrapper>
  );
};

export default CompleteTask;
