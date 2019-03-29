/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMeta } from '../../services/meta';
import { setSelectedTaskSlug } from '../../services/tasks';
import { useInProgressTaskSlug, useSelectedTaskSlug } from '../../hooks/tasks';
import './taskPanel.css';

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
    <div
      className="mercury__task-panel"
      data-viewing={inProgressTaskSlug === slug}
      data-active={selectedTaskSlug === slug}
    >
      <heading className="mercury__task-panel__header">
        <button
          className="mercury__task-panel__header__name"
          onClick={() => setSelectedTaskSlug(slug, 'task panel click')}
          type="button"
        >
          {name}
        </button>
        <button
          className="mercury__task-panel__header__toggle"
          onClick={() => setIsExpanded(! isExpanded)}
          type="button"
        >
          V
        </button>
      </heading>
      {(isExpanded || selectedTaskSlug === slug) && (
        <div className="mercury__task-panel__expanded">
          <span>Assigned To: James Burke</span>
          <span>Due Date: June 3rd</span>
          <span>Status: In Progress</span>
        </div>
      )}
    </div>
  );
};

TaskPanel.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TaskPanel;
