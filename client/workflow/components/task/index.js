import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useInProgressTaskSlug,
  useSelectedTaskSlug,
} from 'hooks/tasks';
import { completeTask, getTask } from 'services/tasks';
import { setMetaGroup } from 'services/meta';
import getInitialValues from 'utils/getInitialTaskValues';
import getValidationSchema from 'utils/getValidationSchema';
import Header from 'components/task/header';
import Footer from 'components/task/footer';
import Fields from 'components/fields';
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
  } = props;
  const inProgressTaskSlug = useInProgressTaskSlug();
  const selectedTaskSlug = useSelectedTaskSlug();
  const selectedTask = getTask(selectedTaskSlug);
  const { nextTasks } = selectedTask;

  return (
    <Wrapper>
      <Header
        name={name}
        inProgress={slug === inProgressTaskSlug}
      />
      <Formik
        onSubmit={(values, actions) => {
          setMetaGroup(values);
          completeTask(selectedTaskSlug, values['next-task-slug']);
          actions.setSubmitting(false);
        }}
        initialValues={getInitialValues(fields, nextTasks)}
        validationSchema={getValidationSchema(fields)}
        render={(formProps) => {
          const { handleSubmit, values, errors } = formProps;

          return (
            <Form onSubmit={handleSubmit}>
              <FormHeader>
                <div>Due June 3rd</div>
                <div>
                  Assigned to
                  <button type="button">James Burke</button>
                </div>
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
                selectedTaskSlug={selectedTaskSlug}
                nextTaskSlug={values['next-task-slug']}
                nextTasks={nextTasks}
              />
            </Form>
          );
        }}
      />
    </Wrapper>
  );
};

Task.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
};

export default Task;
