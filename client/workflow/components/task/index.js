import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  useInProgressTaskSlug,
  useSelectedTaskSlug,
} from 'hooks/tasks';
import { completeTask, getTask } from 'services/tasks';
import { setMeta } from 'services/meta';
import Header from 'components/task/header';
import Footer from 'components/task/footer';
import Fields from 'components/fields';
import getInitialValues from './getInitialValues';
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
          setMeta(values);
          completeTask(selectedTaskSlug, values['next-task-slug']);
          actions.setSubmitting(false);
        }}
        initialValues={getInitialValues(fields, nextTasks)}
        render={(formProps) => {
          const { handleSubmit, values } = formProps;

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
                fields={fields}
                slug={slug}
                {...formProps}
              />
              <Footer
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
