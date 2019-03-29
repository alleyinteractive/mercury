/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

const NextTaskAssignee = (props) => {
  const {
    isActive,
    nextTaskSlug,
    nextTasks,
    setNextTaskSlug,
  } = props;

  // Don't display anything if there's only one next task. It'll become the
  // button label instead.
  if (1 === nextTasks.length) {
    return null;
  }

  // Build next task options dropdown.
  const options = nextTasks.map((task) => (
    <option value={task.slug}>
      {task.label}
    </option>
  ));

  const handleNextTaskChange = (event) => {
    setNextTaskSlug(event.target.value);
  };

  return (
    <div className="mercury__footer__next-task">
      <label
        className="mercury__footer__label"
        htmlFor="next-task"
      >
        <select
          id="next-task"
          name="next-task"
          onChange={handleNextTaskChange}
          value={nextTaskSlug}
          disabled={! isActive}
        >
          {options}
        </select>
      </label>
    </div>
  );
};

NextTask.propTypes = {
  setNextTaskSlug: PropTypes.func.isRequired,
  nextTaskSlug: PropTypes.string.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      taskSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NextTask;
