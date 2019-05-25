import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const TextArea = (props) => {
  const {
    slug,
    readOnly,
    defaultValue,
  } = props;

  return (
    <Field
      component="textarea"
      id={slug}
      name={slug}
      readOnly={readOnly}
      value={defaultValue}
    />
  );
};

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
};

TextArea.defaultProps = {
  defaultValue: '',
};

export default TextArea;
