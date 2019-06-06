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
    readOnly,
  } = props;

  return (
    <InlineLabel>
      <Field
        type="checkbox"
        id={slug}
        name={slug}
        checked={!! value}
        disabled={readOnly}
      />
      <OptionText>{label}</OptionText>
    </InlineLabel>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default Checkbox;
