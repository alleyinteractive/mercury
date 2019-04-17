import React from 'react';
import { hot } from 'react-hot-loader/root';
import Workflow from 'components/workflow';
import useWorkflows from 'hooks/workflows';
import useUser from 'hooks/users';

const App = () => {
  const workflows = useWorkflows();
  const user = useUser();

  // Workflows haven't loaded.
  if (0 === workflows.length) {
    return (
      <div>Loading Workflows</div>
    );
  }

  // User hasn't loaded.
  if ({} === user) {
    return (
      <div>Loading User</div>
    );
  }

  return (
    <Workflow />
  );
};

export default hot(App);
