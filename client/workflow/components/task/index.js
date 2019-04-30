import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useInProgressTaskSlug } from 'hooks/tasks';
import { completeTask } from 'services/tasks';
import { setMetaGroup } from 'services/meta';
import getInitialValues from 'utils/getInitialTaskValues';
import getValidationSchema from 'utils/getValidationSchema';
import resolveUrl from 'utils/resolveUrl';
import Header from 'components/task/header';
import { Wrapper } from './taskStyles.js';
import TaskForm from './form';

const Task = (props) => {
  const {
    assignees,
    fields,
    name,
    nextTasks,
    slug,
  } = props;
  const inProgressTaskSlug = useInProgressTaskSlug();

  return (
    <Wrapper>
      <Header
        name={name}
        inProgress={slug === inProgressTaskSlug}
      />
      <Formik
        onSubmit={(values, actions) => {
          const nextTaskSlug = values['next-task-slug'];
          const {
            enableRedirect,
            redirectUrl,
          } = nextTasks.find((nextTask) => nextTask.slug === nextTaskSlug);
          actions.setSubmitting(true);

          // Save meta, just in case (it also saves onChange for each field).
          setMetaGroup(values);

          // Complete the current task (also saves post).
          completeTask(slug, values['next-task-slug']);

          actions.setSubmitting(false);
          // Redirect user, if applicable.
          if (enableRedirect) {
            const urlResolved = resolveUrl(redirectUrl);

            if (urlResolved) {
              window.location = urlResolved;
            }
          }
        }}
        initialValues={getInitialValues(props)}
        validationSchema={getValidationSchema(props)}
        render={(formProps) => (
          <TaskForm
            assignees={assignees}
            fields={fields}
            inProgressTaskSlug={inProgressTaskSlug}
            nextTasks={nextTasks}
            slug={slug}
            {...formProps}
          />
        )}
      />
    </Wrapper>
  );
};

Task.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  assignees: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      enableRedirect: PropTypes.bool,
      label: PropTypes.string,
      slug: PropTypes.string,
      redirectUrl: PropTypes.string,
    })
  ).isRequired,
  slug: PropTypes.string.isRequired,
};

export default Task;
