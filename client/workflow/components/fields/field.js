import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMeta } from 'services/meta';
import { ThemeProvider } from 'styled-components';
import Select from './select';
import Assignee from './assignee';
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
    theme,
    value,
  } = props;
  const fieldMap = {
    assignee: Assignee,
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
    <ThemeProvider theme={theme}>
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
              {error}
            </ErrorText>
          )}
        </Label>
      </Wrapper>
    </ThemeProvider>
  );
};

FormField.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

FormField.defaultProps = {
  theme: {},
  readOnly: false,
  required: false,
};

export default FormField;
