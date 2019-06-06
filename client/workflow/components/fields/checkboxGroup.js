import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';
import kebabCase from 'lodash/kebabCase';
import {
  sortBy,
  get,
  map,
} from 'lodash/fp';
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
    readOnly,
  } = props;

  if (! optionsSourceList || ! optionsSourceList.length) {
    return null;
  }

  return (
    <FieldArray
      name={slug}
      render={(arrayHelpers) => {
        // Sort the options by their value (which will group any duplicates).
        const sortedOptions = sortBy(
          ({ value: optionValue }) => optionValue,
          optionsSourceList
        );
        // Get all the values from each option.
        const sortedValues = map(get('value'), sortedOptions);
        // Filter the sorted values, including only values that are equal to the next
        // item in the array (indicating a duplicate).
        const dupes = sortedValues.filter(
          (val, idx) => val === sortedValues[idx + 1]
        );

        return (
          <GroupWrapper>
            {optionsSourceList.map((field) => {
              const { label, value: optionValue } = field;
              const fieldKey = `${kebabCase(label)}-${optionValue}`;
              // If an option value is a duplicate, use the field key instead.
              const optionValueDeduped = dupes.includes(optionValue)
                ? fieldKey : optionValue;

              return (
                <InlineLabel key={fieldKey}>
                  <Field
                    name={slug}
                    component={(fieldProps) => {
                      const { field: fieldHelpers } = fieldProps;

                      return (
                        <input
                          {...fieldHelpers}
                          disabled={readOnly}
                          type="checkbox"
                          id={fieldKey}
                          checked={value.includes(optionValueDeduped)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              arrayHelpers.push(optionValueDeduped);
                            } else {
                              arrayHelpers.remove(
                                value.indexOf(optionValueDeduped)
                              );
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
        );
      }}
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
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ).isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default CheckboxGroup;
