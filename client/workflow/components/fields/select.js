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
    readOnly,
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
      options.unshift(<option value />);
    }
    return options;
  };

  if (readOnly) {
    const selectedOption = optionsSourceList
      .find((option) => (option.value === parseInt(value, 10)));

    return (
      <div className="mercury__field__readOnly">
        {selectedOption.label}
      </div>
    );
  }

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
  readOnly: PropTypes.bool,
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  optionsFirstEmpty: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
