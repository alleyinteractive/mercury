/* eslint-disable */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useMeta from '../../hooks/meta';
import { getMeta, setMeta } from '../../services/meta';
import getWorkflows from '../../services/workflows';

const SelectWorkflow = (props) => {
  const workflowSlug = useMeta('mercury_active_workflow_slug');

  return (
    <Fragment>
      <div className="mercury__select__workflow">
        <select
          value={workflowSlug}
          onChange={(event) => setMeta('mercury_active_workflow_slug', event.target.value)}
        >
          {getWorkflows().map((workflow) =>
            <option value={workflow.slug}>{workflow.name}</option>
          )}
        </select>
      </div>
    </Fragment>
  );
};

SelectWorkflow.propTypes = {
  workflows: PropTypes.object.isRequired,
};

export default SelectWorkflow;
