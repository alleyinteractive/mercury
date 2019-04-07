import React, { useState, useCallback } from 'react';
import getWorkflows, {
  setActiveWorkflowSlug,
  getActiveWorkflowSlug,
} from 'services/workflows';
import { setSelectedTaskSlug } from 'services/tasks';
import {
  useSelectedTaskSlug,
  useInProgressTaskSlug,
} from 'hooks/tasks';
import IconArrow from 'icons/arrow.svg';
import {
  ExpandDown,
  ExpandHeight,
} from 'components/helpers/animations';
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
  InProgressIndicator,
} from './menuStyles';

const Menu = () => {
  const workflows = getWorkflows();
  const selectedWorkflowSlug = getActiveWorkflowSlug();
  const selectedTaskSlug = useSelectedTaskSlug();
  const [
    visibleWorkflow,
    setVisibleWorkflow,
  ] = useState(selectedWorkflowSlug);

  return (
    <Wrapper>
      <WorkflowList>
        {workflows.map((workflow) => {
          const {
            name,
            slug,
            tasks,
          } = workflow;
          const inProgressTaskSlug = useInProgressTaskSlug();
          const tasksVisible = visibleWorkflow === slug;
          const [height, setHeight] = useState(0);
          const heightRef = useCallback((node) => {
            if (null !== node) {
              setHeight(node.getBoundingClientRect().height);
            }
          }, []);

          return (
            <WorkflowMenuWrapper key={slug}>
              <WorkflowItem>
                <ActivateWorkflowButton
                  onClick={() => {
                    setVisibleWorkflow(slug);
                    setActiveWorkflowSlug(slug);
                  }}
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
                pose={(tasksVisible && height) ? 'expanded' : 'collapsed'}
                maxHeight={height}
              >
                <ExpandDown pose={tasksVisible ? 'expanded' : 'collapsed'}>
                  <TaskList ref={heightRef}>
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
                              <InProgressIndicator />
                            )}
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
