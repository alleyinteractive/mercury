import React from 'react';
import PropTypes from 'prop-types';
import { getTask } from 'services/tasks';
import { getAssignee } from 'services/users';
import Select from 'components/fields/select';
import useUser from 'hooks/users';
import Heading from './assigneeStyles.js';

const Assignee = (props) => {
  const {
    taskSlug,
  } = props;
  const task = getTask(taskSlug);
  const currentAssignee = getAssignee(taskSlug);
  const {
    roles,
  } = useUser();

  // Get the assignee's name for display.
  const assignee = task.assignees.assigneeOptions
    .find((option) => (option.value === parseInt(currentAssignee, 10)));
  const { label: assigneeName } = assignee || {};

  // Determine if user has permission to see the select field.
  const editAssignee = roles.some(
    (role) => task.assignees.assigneeSelectionPermissions.roles
      .includes(role)
  );

  return (
    <div>
      <Heading>Assignee:</Heading>
      {editAssignee ? (
        <Select
          slug={`mercury_${taskSlug}_assignee_id`}
          optionsFirstEmpty
          optionsSourceList={task.assignees.assigneeOptions}
        />
      ) : (
        <span>{assigneeName || 'no one'}</span>
      )}
    </div>
  );
};

Assignee.propTypes = {
  taskSlug: PropTypes.string.isRequired,
};

export default Assignee;
