import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { setSelectedTaskSlug } from 'services/tasks';
import { useInProgressTaskSlug, useSelectedTaskSlug } from 'hooks/tasks';
import {
  Wrapper,
  Header,
  HeaderName,
  HeaderToggle,
  PanelExpaned,
} from './taskPanelStyles.js';

const TaskPanel = (props) => {
  const {
    name,
    slug,
  } = props;

  // Custom hooks.
  const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();

  // Task panel expanded.
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Wrapper
      data-viewing={inProgressTaskSlug === slug}
      data-active={selectedTaskSlug === slug}
    >
      <Header>
        <HeaderName
          onClick={() => setSelectedTaskSlug(slug, 'task panel click')}
          type="button"
        >
          {name}
        </HeaderName>
        <HeaderToggle
          onClick={() => setIsExpanded(! isExpanded)}
          type="button"
        >
          V
        </HeaderToggle>
      </Header>
      {(isExpanded || selectedTaskSlug === slug) && (
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
