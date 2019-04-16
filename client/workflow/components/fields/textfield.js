import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const TextField = (props) => {
  const {
    slug,
    readOnly,
  } = props;

  return (
    <Field
      type="text"
      id={slug}
      name={slug}
      readOnly={readOnly}
    />
  );
};

TextField.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default TextField;
