import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const TextArea = (props) => {
  const { slug } = props;

  return (
    <Field
      component="textarea"
      id={slug}
      name={slug}
    />
  );
};

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextArea;
