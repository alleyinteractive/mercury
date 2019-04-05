import React, { useState, useRef } from 'react';
import getWorkflows, { setActiveWorkflowSlug } from 'services/workflows';
import { setSelectedTaskSlug } from 'services/tasks';
import IconArrow from 'icons/arrow.svg';
import {
  Wrapper,
  WorkflowList,
  TaskList,
  TaskButton,
  WorkflowMenuWrapper,
  WorkflowItem,
  TaskItem,
  ExpandWorkflowMenuButton,
  ActivateWorkflowButton,
} from './menuStyles';
import {
  ExpandDown,
  ExpandHeight,
} from './menuAnimations';

const Menu = () => {
  const workflows = getWorkflows();
  const [
    visibleWorkflow,
    setVisibleWorkflow,
  ] = useState(workflows[0].slug);

  return (
    <Wrapper>
      <WorkflowList>
        {workflows.map((workflow) => {
          const {
            name,
            slug,
            tasks,
          } = workflow;
          const tasksVisible = visibleWorkflow === slug;
          const taskListRef = useRef(null);

          return (
            <WorkflowMenuWrapper key={slug}>
              <WorkflowItem>
                <ActivateWorkflowButton
                  onClick={() => setActiveWorkflowSlug(slug)}
                >
                  {name}
                </ActivateWorkflowButton>
                <ExpandWorkflowMenuButton
                  onClick={() => setVisibleWorkflow(slug)}
                  active={tasksVisible}
                >
                  <IconArrow />
                </ExpandWorkflowMenuButton>
              </WorkflowItem>
              <ExpandHeight
                pose={tasksVisible ? 'expanded' : 'collapsed'}
                maxHeight={taskListRef.current
                  ? taskListRef.current.offsetHeight : 0}
              >
                <ExpandDown pose={tasksVisible ? 'expanded' : 'collapsed'}>
                  <TaskList ref={taskListRef}>
                    {tasks.map((task) => {
                      const {
                        name: taskName,
                        slug: taskSlug,
                      } = task;

                      return (
                        <TaskItem key={taskSlug}>
                          <TaskButton
                            type="button"
                            onClick={() => setSelectedTaskSlug(taskSlug)}
                          >
                            {taskName}
                          </TaskButton>
                        </TaskItem>
                      );
                    })}
                  </TaskList>
                </ExpandDown>
              </ExpandHeight>
            </WorkflowMenuWrapper>
          );
        })}
      </WorkflowList>
    </Wrapper>
  );
};

export default Menu;
