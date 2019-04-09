import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import {
  SelectWrapper,
} from './fieldStyles.js';

const Select = (props) => {
  const {
    slug,
    optionsSourceList,
    optionsFirstEmpty,
  } = props;
  const value = useMeta(slug);

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
        value={value}
        onChange={(event) => setMeta(slug, event.target.value)}
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
