/* eslint-disable */

import React from 'react';
import { Formik } from 'formik';
import Header from './header';
import Fields from './fields';
import Footer from './footer';
import './task.css';

const Task = (props) => {
  return (
    <div className="mercury__task__settings">
      <Formik
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        render={props => (
          <form
            className="mercury__task__form"
            onSubmit={props.handleSubmit}
          >
            <Header/>
            <Fields/>
            <Footer/>
          </form>
        )}
      />
    </div>
  );
};

export default Task;
