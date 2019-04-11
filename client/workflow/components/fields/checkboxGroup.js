import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';
import {
  GroupWrapper,
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const CheckboxGroup = (props) => {
  const {
    slug,
    optionsSourceList,
    value,
  } = props;

  if (! optionsSourceList || ! optionsSourceList.length) {
    return null;
  }

  return (
    <FieldArray
      name={slug}
      render={(arrayHelpers) => (
        <GroupWrapper>
          {optionsSourceList.map((field) => {
            const { label, value: optionValue } = field;

            return (
              <InlineLabel key={optionValue}>
                <Field
                  name={slug}
                  component={(fieldProps) => {
                    const { field: fieldHelpers } = fieldProps;

                    return (
                      <input
                        {...fieldHelpers}
                        type="checkbox"
                        id={optionValue}
                        checked={value.includes(optionValue)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            arrayHelpers.push(optionValue);
                          } else {
                            arrayHelpers.remove(value.indexOf(optionValue));
                          }
                        }}
                      />
                    );
                  }}
                />
                <OptionText>{label}</OptionText>
              </InlineLabel>
            );
          })}
        </GroupWrapper>
      )}
    />
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
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckboxGroup;
