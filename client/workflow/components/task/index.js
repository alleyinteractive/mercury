import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useInProgressTaskSlug } from 'hooks/tasks';
import {
  completeTask,
  setPostStatus,
  getNextTaskActualSlug,
} from 'services/tasks';
import {
  setMetaGroup,
  getInitialValues,
} from 'services/meta';
import getValidationSchema from 'utils/getValidationSchema';
import Header from 'components/task/header';
import Footer from 'components/task/footer';
import Fields from 'components/fields';
import Assignee from './assignee';
import {
  Wrapper,
  Form,
  FormHeader,
} from './taskStyles.js';

const Task = (props) => {
  const {
    slug,
    name,
    fields,
    assignees,
    nextTasks,
  } = props;
  const inProgressTaskSlug = useInProgressTaskSlug();
  const initialValues = getInitialValues(props);
  const inProgress = slug === inProgressTaskSlug;

  // Set post status when in-progress task renders.
  useEffect(() => {
    if (inProgress) {
      setPostStatus(slug);
    }
  }, [inProgress]);

  return (
    <Wrapper>
      <Header
        name={name}
        inProgress={inProgress}
      />
      {(!! Object.keys(initialValues).length) && (
        <Formik
          onSubmit={(values, actions) => {
            setMetaGroup(values);
            completeTask(slug, getNextTaskActualSlug(values['next-task-slug']));
            actions.setSubmitting(false);
          }}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={getValidationSchema(props)}
          render={(formProps) => {
            const { handleSubmit, values, errors } = formProps;

            return (
              <Form onSubmit={handleSubmit}>
                <FormHeader>
                  <Assignee
                    assignees={assignees}
                    taskSlug={slug}
                    formProps={formProps}
                  />
                </FormHeader>
                <Fields
                  errors={errors}
                  fields={fields}
                  slug={slug}
                  {...formProps}
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
          }}
        />
      )}
    </Wrapper>
  );
};

Task.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  assignees: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nextTasks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Task;
