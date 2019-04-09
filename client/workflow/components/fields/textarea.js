import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  TextAreaWrapper,
} from './fieldStyles.js';

const TextArea = (props) => {
  const { slug } = props;

  return (
    <TextAreaWrapper>
      <Field
        component="textarea"
        id={slug}
        name={slug}
      />
    </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextArea;
