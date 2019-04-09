import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import {
  GroupWrapper,
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const CheckboxGroup = (props) => {
  const {
    slug,
    optionsSourceList,
    readOnly,
  } = props;
  let value = useMeta(slug);

  /**
   * Add or remove a value to the array of checked values.
   *
   * @param {string} optionValue Value to add to meta array
   */
  const addOrRemoveOptionValue = (optionValue) => {
    let newValue = value;

    if (value.includes(optionValue)) {
      newValue = value.filter(
        (valueItem) => valueItem !== optionValue
      );
    } else {
      newValue.push(optionValue);
    }

    return newValue;
  };

  // Try to parse meta value into json.
  try {
    value = JSON.parse(value);
  } catch {
    value = value ? [value] : [];
  }

  if (! optionsSourceList || ! optionsSourceList.length) {
    return null;
  }

  return (
    <GroupWrapper>
      {optionsSourceList.map((field) => {
        const { label, value: optionValue } = field;

        return (
          <InlineLabel key={optionValue}>
            <Field
              type="checkbox"
              id={optionValue}
              name={slug}
              checked={value.includes(optionValue)}
              onChange={() => {
                setMeta(
                  slug,
                  JSON.stringify(addOrRemoveOptionValue(optionValue))
                );
              }}
              value={optionValue}
              readOnly={readOnly}
            />
            <OptionText>{label}</OptionText>
          </InlineLabel>
        );
      })}
    </GroupWrapper>
  );
};

CheckboxGroup.propTypes = {
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
  readOnly: false,
};

export default CheckboxGroup;
