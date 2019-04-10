import React from 'react';
import PropTypes from 'prop-types';
import { getTask } from 'services/tasks';
import omit from 'lodash/fp/omit';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import Select from './select';

const Assignee = (props) => {
  const {
    assigneeTaskSlug,
    slug,
  } = props;
  const task = getTask(assigneeTaskSlug);

  // Get the current assignee.
  const currentAssignee = useMeta(slug);

  // If there's no current assignee, set to the default assignee (if defined).
  if (! currentAssignee && task.assignees.defaultUser) {
    setMeta(slug, task.assignees.defaultUser.toString());
  }

  return (
    <Select
      {...omit(
        ['optionsFirstEmpty', 'optionsSource', 'optionsSourceList'],
        props
      )}
      optionsFirstEmpty
      optionsSource="list"
      optionsSourceList={task.assignees.assigneeOptions}
    />
  );
};

Assignee.propTypes = {
  assigneeTaskSlug: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Assignee;
