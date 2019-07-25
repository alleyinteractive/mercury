import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const Select = (props) => {
  const {
    slug,
    optionsSourceList,
    optionsFirstEmpty,
    readOnly,
  } = props;

  return (
    <Field
      component="select"
      id={slug}
      name={slug}
      disabled={readOnly}
      defaultValue={(! optionsFirstEmpty && optionsSourceList.length)
        ? optionsSourceList[0].value : null}
    >
      {optionsFirstEmpty && (
        <option value="" />
      )}
      {optionsSourceList.map((option) => {
        const { label, value: optionValue } = option;

        return (
          <option value={optionValue} key={optionValue}>
            {label}
          </option>
        );
      })}
    </Field>
  );
};

Select.propTypes = {
  slug: PropTypes.string.isRequired,
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
  readOnly: PropTypes.bool,
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
