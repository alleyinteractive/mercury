import React from 'react';
import PropTypes from 'prop-types';
import { getAssignee } from 'services/users';
import FormField from 'components/fields/field';
import useUser from 'hooks/users';
import * as fieldTheme from './assigneeStyles.js';

const Assignee = (props) => {
  const {
    assignees: {
      assigneeOptions,
      assigneeSelectionPermissions,
    },
    taskSlug,
    formProps: {
      handleChange,
      values,
      errors,
    },
  } = props;
  const fieldSlug = `mercury_${taskSlug}_assignee_id`;
  const currentAssignee = getAssignee(taskSlug);
  const { roles } = useUser();

  // Get the assignee's name for display.
  const assignee = assigneeOptions.find(
    (option) => (option.value === parseInt(currentAssignee, 10))
  );
  const { label: assigneeName } = assignee || {};

  // Determine if user has permission to see the select field.
  const editAssignee = roles.some(
    (role) => assigneeSelectionPermissions.roles.includes(role)
  );

  return (
    <div>
      {editAssignee ? (
        <FormField
          optionsFirstEmpty
          error={errors[fieldSlug] || ''}
          value={values[fieldSlug]}
          handleChange={handleChange}
          slug={fieldSlug}
          label="Assignee:"
          theme={fieldTheme}
          type="select"
          optionsSourceList={assigneeOptions}
        />
      ) : (
        <span>{assigneeName || 'no one'}</span>
      )}
    </div>
  );
};

Assignee.propTypes = {
  assignees: PropTypes.shape({
    assigneeOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
      })
    ).isRequired,
    assigneeSelectionPermissions: PropTypes.shape({
      roles: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  taskSlug: PropTypes.string.isRequired,
  formProps: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  }).isRequired,
};

export default Assignee;
