/* eslint-disable */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInProgressTaskSlug from '../../hooks/tasks';
import { setMeta } from '../../services/meta';
import { setInProgressTaskSlug } from '../../services/tasks';
import './taskPanel.css';

const TaskPanel = (props) => {
  const {
    name,
    slug,
  } = props;

  const inProgressTaskSlug = useInProgressTaskSlug();
  const isInProgress = inProgressTaskSlug === slug;
  const isSelected = inProgressTaskSlug === slug;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="mercury__task"
      data-active={isInProgress}
      data-viewing={isSelected}
    >
      <heading className="mercury__task__header">
        <button
          className="mercury__task__header__name"
          type="button"
          onClick={() => setInProgressTaskSlug(slug)}
        >
          {name}
        </button>
        <button
          className="mercury__task__header__toggle"
          onClick={() => setIsExpanded(! isExpanded)}
          type="button"
        >
          V
        </button>
      </heading>
      {(isExpanded || isSelected) && (
        <div className="mercury__task__expanded">
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
