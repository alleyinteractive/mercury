import React from 'react';
import PropTypes from 'prop-types';
import { useActiveWorkflowSlug } from 'hooks/workflows';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getWorkflow } from 'services/workflows';
import { getAssignee } from 'services/users';
import Task from 'components/task';
import TaskHeader from 'components/task/header';
import Menu from 'components/menu';
import {
  Wrapper,
  TaskWrapper,
} from './workflowStyles.js';

const Workflow = (props) => {
  const { workflows } = props;
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
  const assignee = task ? getAssignee(task.slug) : null;

  const userData = wp.data.select('mercury/workflows').requestUser();
  const isContributor = userData.roles.includes('contributor');
  const isContributorAssignedTask = isContributor && (userData.id === assignee);
  const shouldSeeTask = (! isContributor) || isContributorAssignedTask;

  return (
    <Wrapper>
      <Menu
        selectedTaskSlug={task ? task.slug : 'none'}
        workflows={workflows}
        disabled={isContributor}
      />
      {shouldSeeTask && task && (
        <TaskWrapper>
          <Task {...task} key={task.slug} />
        </TaskWrapper>
      )}
      {(! shouldSeeTask && task) && (
        /* eslint-disable-next-line max-len */
        <TaskHeader name="You are not assigned to this task and lack privileges to view it." />
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

Workflow.propTypes = {
  workflows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default Workflow;
