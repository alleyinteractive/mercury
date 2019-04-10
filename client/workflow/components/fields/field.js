import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'formik';
import { setMeta } from 'services/meta';
import Select from './select';
import TextArea from './textarea';
import TextField from './textfield';
import Checkbox from './checkbox';
import CheckboxGroup from './checkboxGroup';
import RadioGroup from './radioGroup';
import ReadOnly from './readOnly';
import {
  Wrapper,
  LabelWrapper,
  Label,
  LabelText,
  InputWrapper,
  ReadOnlyLabel,
  RequiredLabel,
  ErrorText,
} from './fieldStyles.js';

const FormField = (props) => {
  const {
    label,
    slug,
    type,
    readOnly,
    required,
    error,
    value,
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

  // Set value in Gutenberg meta whenever it changes.
  useEffect(() => {
    setMeta(slug, value);
    return () => {};
  }, [value]);

  return (
    <Wrapper>
      <Label
        htmlFor={slug}
        required={required}
        error={error}
      >
        <LabelWrapper>
          {'checkbox' !== type && (
            <LabelText>{label}</LabelText>
          )}
          {readOnly && (
            <ReadOnlyLabel>(Read only)</ReadOnlyLabel>
          )}
          {required && <RequiredLabel>required</RequiredLabel>}
        </LabelWrapper>
        {readOnly
          ? <ReadOnly slug={slug} />
          : (
            <InputWrapper>
              <FieldComponent {...props} />
            </InputWrapper>
          )
        }
        {error && (
          <ErrorText>
            {error.replace ? error.replace(slug, 'This') : error}
          </ErrorText>
        )}
      </Label>
    </Wrapper>
  );
};

FormField.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  // formik: PropTypes.shape({
  //   values: PropTypes.object.isRequired,
  // }).isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool.isRequired,
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
