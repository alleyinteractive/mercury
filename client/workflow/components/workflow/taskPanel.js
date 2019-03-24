/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMeta } from '../../services/meta';
import { setSelectedTaskSlug } from '../../services/tasks';
import './taskPanel.css';

const TaskPanel = (props) => {
  const {
    name,
    slug,
    isInProgress,
    isSelected,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="mercury__task-panel"
      data-active={isSelected}
      data-viewing={isInProgress}
    >
      <heading className="mercury__task-panel__header">
        <button
          className="mercury__task-panel__header__name"
          type="button"
          onClick={() => setSelectedTaskSlug(slug)}
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
      {(isExpanded || isSelected) && (
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
