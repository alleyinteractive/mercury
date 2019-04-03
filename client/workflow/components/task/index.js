import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Header from './header';
import Fields from './fields';
import Footer from './footer';
import './task.css';

const Task = () => (
  <div className="mercury__task__settings">
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={(props) => (
        <form
          className="mercury__task__form"
          onSubmit={props.handleSubmit}
        >
          <Header />
          <Fields />
          <Footer />
        </form>
      )}
    />
  </div>
);

Task.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Task;
