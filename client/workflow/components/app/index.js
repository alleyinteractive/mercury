import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import Workflow from 'components/workflow';

const { withSelect, select } = wp.data;

const App = (props) => {
  const { workflows, loading } = props;

  // Loading
  if (loading) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <Workflow workflows={workflows} />
  );
};

App.propTypes = {
  workflows: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

const appSelect = withSelect(() => ({
  workflows: select('mercury/workflows').requestWorkflows(),
  loading: select('mercury/workflows').getLoading(),
}));

export default hot(appSelect(App));
