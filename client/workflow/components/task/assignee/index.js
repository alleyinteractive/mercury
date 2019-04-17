import React from 'react';
import PropTypes from 'prop-types';
import FormField from 'components/fields/field';
import useUser from 'hooks/users';
import * as fieldTheme from './assigneeStyles.js';

const Assignee = (props) => {
  const {
    assignees: {
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
  const { roles } = useUser();

  // Determine if user has permission to see the select field.
  const editAssignee = roles.some(
    (role) => assigneeSelectionPermissions.roles.includes(role)
  );

  return (
    <div>
      <FormField
        readOnly={! editAssignee}
        error={errors[fieldSlug] || ''}
        value={values[fieldSlug]}
        handleChange={handleChange}
        slug={fieldSlug}
        label="Assignee:"
        theme={fieldTheme}
        assigneeTaskSlug={taskSlug}
        type="assignee"
      />
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
