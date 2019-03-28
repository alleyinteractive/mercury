/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Workflow from '../Workflow';
import useWorkflows from '../../hooks/workflows';

const App = () => {
  const workflows = useWorkflows();

  // Workflows haven't loaded.
  if (0 === workflows.length) {
    return (
      <div>Loading Workflows</div>
    );
  }

  return (
    <Workflow/>
  );
};

export default App;
