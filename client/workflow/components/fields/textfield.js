import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const TextField = (props) => {
  const { slug } = props;

  return (
    <Field
      type="text"
      id={slug}
      name={slug}
    />
  );
};

TextField.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextField;
