import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  SelectWrapper,
} from './fieldStyles.js';

const Select = (props) => {
  const {
    slug,
    optionsSourceList,
    optionsFirstEmpty,
  } = props;
  const getOptions = () => {
    const options = optionsSourceList.map((option) => {
      const { label, value: optionValue } = option;

      return (
        <option value={optionValue} key={optionValue}>
          {label}
        </option>
      );
    });

    if (optionsFirstEmpty) {
      options.shift(<option disabled selected value />);
    }

    return options;
  };

  return (
    <SelectWrapper>
      <Field
        component="select"
        id={slug}
        name={slug}
      >
        {getOptions()}
      </Field>
    </SelectWrapper>
  );
};

Select.propTypes = {
  slug: PropTypes.string.isRequired,
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  optionsFirstEmpty: PropTypes.bool.isRequired,
};

export default Select;
