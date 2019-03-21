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
  } = props;

  return (
    <footer className="mercury__footer">
      <div className="mercury__footer__assigned">
        <span>Assigned To: James Burke</span>
        <span>Due Date: June 03</span>
      </div>
      <div className="mercury__footer__complete">
        <NextTask
          nextTaskSlug={nextTaskSlug}
          nextTasks={nextTasks}
          setNextTaskSlug={setNextTaskSlug}
          isActive={isActive}
        />
        <Assignee />
        <CompleteButton
          completeTask={completeTask}
          nextTasks={nextTasks}
          isActive={isActive}
        />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  completeTask: PropTypes.func.isRequired,
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

export default Footer;
