import React from 'react';
import PropTypes from 'prop-types';
import { getTask } from 'services/tasks';
import omit from 'lodash/fp/omit';
import Select from './select';

const Assignee = (props) => {
  const { assigneeTaskSlug } = props;
  const task = getTask(assigneeTaskSlug);
  const {
    assignees: {
      assigneeOptions,
    },
  } = task;

  return (
    <Select
      {...omit(
        ['optionsFirstEmpty', 'optionsSource', 'optionsSourceList'],
        props
      )}
      optionsFirstEmpty
      optionsSource="list"
      optionsSourceList={assigneeOptions}
    />
  );
};

Assignee.propTypes = {
  assigneeTaskSlug: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Assignee;
