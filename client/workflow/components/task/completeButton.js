import React from 'react';
import PropTypes from 'prop-types';

const CompleteButton = (props) => {
  const {
    isActive,
    nextTasks,
    completeTask,
  } = props;

  let label = 'Complete Task';

  // If there's only one task option, display the label.
  if (1 === nextTasks.length) {
    ({ label } = { label: nextTasks[0].label });
  }

  return (
    <button
      type="button"
      onClick={completeTask}
      disabled={! isActive}
    >
      {label}
    </button>
  );
};

CompleteButton.propTypes = {
  completeTask: PropTypes.func.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CompleteButton;
