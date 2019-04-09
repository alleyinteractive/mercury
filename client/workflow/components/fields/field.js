import React from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import TextArea from './textarea';
import TextField from './textfield';
import Checkbox from './checkbox';
import CheckboxGroup from './checkboxGroup';
import RadioGroup from './radioGroup';
import ReadOnly from './readOnly';
import {
  Wrapper,
  Label,
  LabelText,
  InputWrapper,
} from './fieldStyles.js';

const FormField = (props) => {
  const {
    label,
    slug,
    type,
    readOnly,
  } = props;
  const fieldMap = {
    select: Select,
    textarea: TextArea,
    checkbox: Checkbox,
    checkboxes: CheckboxGroup,
    radios: RadioGroup,
    textfield: TextField,
  };
  const FieldComponent = fieldMap[type] ? fieldMap[type] : TextField;

  return (
    <Wrapper>
      <Label htmlFor={slug}>
        {('checkbox' !== type || ('checkbox' === type && readOnly)) && (
          <LabelText>
            {label}
            {readOnly && <span>(Read only)</span>}
          </LabelText>
        )}
        {readOnly
          ? <ReadOnly slug={slug} />
          : (
            <InputWrapper>
              <FieldComponent {...props} />
            </InputWrapper>
          )
        }
      </Label>
    </Wrapper>
  );
};

FormField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

FormField.defaultProps = {
  readOnly: false,
};

export default FormField;
