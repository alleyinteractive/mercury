import React, { useState } from 'react';
import { Tab } from 'react-tabs';
import PropTypes from 'prop-types';
import './taskPanel.css';

const TaskPanel = (props) => {
  const {
    name,
    slug,
    isActive,
    isViewing,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Tab
      className="mercury__task"
      data-active={isActive}
      data-viewing={isViewing}
    >
      <heading className="mercury__task__header">
        <button
          className="mercury__task__header__name"
          data-task={slug}
          type="button"
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
      {(isExpanded || isViewing) && (
        <div className="mercury__task__expanded">
          <span>Assigned To: James Burke</span>
          <span>Due Date: June 3rd</span>
          <span>Status: In Progress</span>
        </div>
      )}
    </Tab>
  );
};

TaskPanel.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isViewing: PropTypes.bool.isRequired,
};

export default TaskPanel;
