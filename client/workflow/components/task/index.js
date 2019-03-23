/* eslint-disable */

import React from 'react';
import useInProgressTaskSlug from '../../hooks/tasks';
import { getInProgressTask } from '../../services/tasks';
import './task.css';

const Workflow = () => {
  const inProgressTaskSlug = useInProgressTaskSlug();
  console.log('Full task: ', getInProgressTask().slug);

  return (
    <div className="mercury__task__settings">
      {inProgressTaskSlug}
    </div>
  );
};

export default Workflow;
