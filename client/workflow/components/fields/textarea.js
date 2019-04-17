import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const TextArea = (props) => {
  const {
    slug,
    readOnly,
  } = props;

  return (
    <Field
      component="textarea"
      id={slug}
      name={slug}
      readOnly={readOnly}
    />
  );
};

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default TextArea;
