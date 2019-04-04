import React from 'react';
import { hot } from 'react-hot-loader/root';
import Workflow from 'components/workflow';
import useWorkflows from 'hooks/workflows';

const App = () => {
  const workflows = useWorkflows();

  // Workflows haven't loaded.
  if (0 === workflows.length) {
    return (
      <div>Loading Workflows</div>
    );
  }

  return (
    <Workflow />
  );
};

export default hot(App);
