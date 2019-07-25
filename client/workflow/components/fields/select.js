import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const Select = (props) => {
  const {
    slug,
    optionsSourceList,
    optionsFirstEmpty,
    readOnly,
    setFieldValue,
  } = props;

  useEffect(() => {
    // Run setFieldValue with the first option in the list of possible
    // options, unless the "empty" option is available. Without this,
    // the field will look like it's set, but the actual post meta will
    // never be updated.
    if (
      ! setFieldValue
      || optionsFirstEmpty
      || ! optionsSourceList.length
      || ! optionsSourceList[0].value
    ) {
      return;
    }

    setFieldValue(slug, optionsSourceList[0].value);
  }, [setFieldValue, slug, optionsFirstEmpty, optionsSourceList]);

  return (
    <Field
      component="select"
      id={slug}
      name={slug}
      disabled={readOnly}
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
  setFieldValue: PropTypes.func.isRequired,
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
