import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';

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
      options.shift(<option disabled selected value />);
    }
    return options;
  };

  if (readOnly) {
    return (
      <div className="mercury__field__readOnly">
        {value}
      </div>
    );
  }

  return (
    <Field
      className="mercury__field__select"
      component="select"
      id={slug}
      name={slug}
      value={value}
      onChange={(event) => setMeta(slug, event.target.value)}
    >
      {getOptions()}
    </Field>
  );
};

Select.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  optionsFirstEmpty: PropTypes.bool.isRequired,
};

Select.defaultProps = {
  readOnly: false,
};

export default Select;
