import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  TextFieldWrapper,
} from './fieldStyles.js';

const TextField = (props) => {
  const { slug } = props;

  return (
    <TextFieldWrapper>
      <Field
        type="text"
        id={slug}
        name={slug}
      />
    </TextFieldWrapper>
  );
};

TextField.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextField;
