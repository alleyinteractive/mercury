import React from 'react';
import PropTypes from 'prop-types';
// import { useSaveOnTransitionComplete } from 'hooks/tasks';
import Footer from 'components/task/footer';
import Fields from 'components/fields';
import Assignee from './assignee';
import {
  Form,
  FormHeader,
} from './taskStyles.js';

const TaskForm = (props) => {
  const {
    assignees,
    errors,
    fields,
    handleSubmit,
    inProgressTaskSlug,
    nextTasks,
    slug,
    values,
  } = props;
  // @todo Commented out for now as it is broken due to custom statuses.
  // useSaveOnTransitionComplete(values['next-task-slug']);

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader>
        <div>Due June 3rd</div>
        <Assignee
          assignees={assignees}
          taskSlug={slug}
          formProps={props}
        />
      </FormHeader>
      <Fields
        errors={errors}
        fields={fields}
        slug={slug}
        {...props}
      />
      <Footer
        errors={errors}
        inProgressTaskSlug={inProgressTaskSlug}
        selectedTaskSlug={slug}
        nextTaskSlug={values['next-task-slug']}
        nextTasks={nextTasks}
      />
    </Form>
  );
};

TaskForm.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  assignees: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inProgressTaskSlug: PropTypes.string.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      enableRedirect: PropTypes.bool,
      label: PropTypes.string,
      slug: PropTypes.string,
      redirectUrl: PropTypes.string,
    })
  ).isRequired,
  slug: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  /* eslint-enable */
};

export default TaskForm;
