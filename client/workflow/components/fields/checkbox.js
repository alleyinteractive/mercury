import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const Checkbox = (props) => {
  const {
    label,
    slug,
  } = props;

  return (
    <InlineLabel>
      <Field
        type="checkbox"
        id={slug}
        name={slug}
      />
      <OptionText>{label}</OptionText>
    </InlineLabel>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Checkbox;
