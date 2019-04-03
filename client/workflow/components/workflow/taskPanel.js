import React from 'react';
import PropTypes from 'prop-types';
import { setSelectedTaskSlug } from 'services/tasks';
import {
//  useInProgressTaskSlug,
  useSelectedTaskSlug,
} from 'hooks/tasks';
import {
  Wrapper,
  Header,
  HeaderName,
  HeaderToggle,
  PanelExpaned,
  Arrow,
} from './taskPanelStyles.js';

const TaskPanel = (props) => {
  const {
    name,
    slug,
  } = props;

  // Custom hooks.
  // const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();
  const active = selectedTaskSlug === slug;

  return (
    <Wrapper active={active}>
      <Header active={active}>
        <HeaderToggle
          active={active}
          onClick={() => {
            setSelectedTaskSlug(slug, 'task panel click');
          }}
          type="button"
        >
          <HeaderName>{name}</HeaderName>
          <Arrow active={active} />
        </HeaderToggle>
      </Header>
      {active && (
        <PanelExpaned>
          <span>Assigned To: James Burke</span>
          <span>Due Date: June 3rd</span>
          <span>Status: In Progress</span>
        </PanelExpaned>
      )}
    </Wrapper>
  );
};

TaskPanel.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TaskPanel;
