import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import DatePicker from './datePicker';

const Date = (props) => {
  const {
    slug,
    readOnly,
  } = props;

  return (
    <Field
      component={DatePicker}
      id={slug}
      name={slug}
      readOnly={readOnly}
      disabled={readOnly}
    />
  );
};

Date.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default Date;
