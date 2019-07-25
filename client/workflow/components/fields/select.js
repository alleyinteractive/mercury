import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const Select = (props) => {
  const {
    slug,
    optionsSourceList,
    optionsFirstEmpty: isFirstEmpty,
    readOnly,
    value,
    setFieldValue,
  } = props;

  // If we don't have a value for the select field, run setFieldValue
  // with a the first option in the list, unless the first item should
  // be an "empty" option. Without this, the field will look like it's set,
  // but the actual post meta will never be updated, even if a defaultValue
  // is specified.
  const defaultValue = (! isFirstEmpty && optionsSourceList.length && ! value)
    ? optionsSourceList[0].value
    : null;

  useEffect(() => {
    if (defaultValue) {
      setFieldValue(slug, defaultValue);
    }
  }, [defaultValue]);

  return (
    <Field
      component="select"
      id={slug}
      name={slug}
      disabled={readOnly}
    >
      {isFirstEmpty && (
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
