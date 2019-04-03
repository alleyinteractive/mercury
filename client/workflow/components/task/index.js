import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Header from './header';
import Fields from './fields';
import Footer from './footer';
import { Wrapper, Form } from './taskStyles.js';

const Task = () => (
  <Wrapper>
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Header />
          <Fields />
          <Footer />
        </Form>
      )}
    />
  </Wrapper>
);

Task.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Task;
