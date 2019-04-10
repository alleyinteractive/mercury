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
    value,
  } = props;

  return (
    <InlineLabel>
      <Field
        type="checkbox"
        id={slug}
        name={slug}
        checked={value}
      />
      <OptionText>{label}</OptionText>
    </InlineLabel>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Checkbox;
