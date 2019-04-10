import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  GroupWrapper,
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const RadioGroup = (props) => {
  const {
    optionsSourceList,
    setFieldValue,
    slug,
  } = props;

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
              name={slug}
              component={(fieldProps) => {
                const {
                  field: fieldHelpers,
                } = fieldProps;

                return (
                  <input
                    {...fieldHelpers}
                    type="radio"
                    id={optionValue}
                    checked={fieldHelpers.value === optionValue}
                    value={optionValue}
                    onChange={() => setFieldValue(slug, optionValue)}
                  />
                );
              }}
            />
            <OptionText>{label}</OptionText>
          </InlineLabel>
        );
      })}
    </GroupWrapper>
  );
};

RadioGroup.propTypes = {
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

export default RadioGroup;
