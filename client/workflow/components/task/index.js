import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useInProgressTaskSlug } from 'hooks/tasks';
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

  return (
    <Wrapper>
      <Header
        name={name}
        inProgress={slug === inProgressTaskSlug}
      />
      <Formik
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        render={(formProps) => {
          const { handleSubmit } = formProps;

          return (
            <Form onSubmit={handleSubmit}>
              <FormHeader>
                <div>Due June 3rd</div>
                <div>
                  Assigned to
                  <button type="button">James Burke</button>
                </div>
              </FormHeader>
              <Fields fields={fields} slug={slug} />
              <Footer />
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
