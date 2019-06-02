import React from 'react';
import PropTypes from 'prop-types';
import { setActiveWorkflowSlug } from 'services/workflows';
import { setSelectedTaskSlug } from 'services/tasks';
import { useActiveWorkflow } from 'hooks/workflows';
import { useInProgressTaskSlug } from 'hooks/tasks';
import ProgressIndicator from 'components/helpers/progressIndicator';
import {
  Wrapper,
  TaskList,
  TaskButton,
  TaskItem,
  SelectLabel,
} from './menuStyles';

const Menu = (props) => {
  const {
    selectedTaskSlug,
    workflows,
    disabled,
  } = props;
  const activeWorkflow = useActiveWorkflow();
  const inProgressTaskSlug = useInProgressTaskSlug();
  const { slug, tasks } = activeWorkflow;

  return (
    <Wrapper>
      <SelectLabel>
        <span>Workflow</span>
        <select
          onChange={(e) => setActiveWorkflowSlug(e.target.value)}
          defaultValue={slug || 'none'}
          disabled={disabled}
        >
          <option value="none">Select a Workflow</option>
          {workflows.map((workflow) => {
            const { slug: workflowSlug, name } = workflow;

            return (
              <option
                key={workflowSlug}
                value={workflowSlug}
              >
                {name}
              </option>
            );
          })}
        </select>
      </SelectLabel>
      <TaskList>
        {tasks.map((task) => {
          const {
            name: taskName,
            slug: taskSlug,
          } = task;

          return (
            <TaskItem key={taskSlug}>
              <TaskButton
                type="button"
                active={selectedTaskSlug === taskSlug}
                onClick={() => setSelectedTaskSlug(taskSlug)}
              >
                <span>{taskName}</span>
                {(inProgressTaskSlug === taskSlug) && (
                  <ProgressIndicator />
                )}
              </TaskButton>
            </TaskItem>
          );
        })}
      </TaskList>
    </Wrapper>
  );
};

Menu.propTypes = {
  selectedTaskSlug: PropTypes.string.isRequired,
  workflows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Menu;
