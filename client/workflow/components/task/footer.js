/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
// import { getMeta } from '../../services/fieldHelpers';
import NextTask from '../nextTask';
import Assignee from '../Assignee';
import CompleteButton from '../completeButton';
import './footer.css';

const Footer = (props) => {
  const {
    completeTask,
    nextTaskSlug,
    nextTasks,
    isActive,
    setNextTaskSlug,
    workflows,
  } = props;

  return (
    <footer className="mercury__footer">
      <div className="mercury__footer__assigned">
        <Assignee
          task={nextTaskSlug}
        />
        <span>
          <strong>Assigned to </strong>
          <button>James Burke</button>
        </span>
      </div>
      <div className="mercury__footer__assigned">
        <span>Due Date: June 3rd, 1990</span>
      </div>
      <div className="mercury__footer__assigned">
        <span>Complete Button</span>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  completeTask: PropTypes.func.isRequired,
  setNextTaskSlug: PropTypes.func.isRequired,
  nextTask: PropTypes.object.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      taskSlug: PropTypes.string.isRequired,
    })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Footer;
