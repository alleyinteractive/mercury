import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMeta } from 'services/meta';
import { ThemeProvider } from 'styled-components';
import Select from './select';
import Assignee from './assignee';
import TextArea from './textarea';
import RichTextArea from './richTextarea';
import TextField from './textfield';
import Checkbox from './checkbox';
import CheckboxGroup from './checkboxGroup';
import RadioGroup from './radioGroup';
import Date from './date';
import {
  Wrapper,
  LabelWrapper,
  Label,
  LabelText,
  InputWrapper,
  RequiredLabel,
  ErrorText,
} from './fieldStyles.js';

const { hooks } = wp;

const FormField = (props) => {
  const {
    label,
    slug,
    type,
    required,
    error,
    theme,
    value,
    setFieldValue,
  } = props;
  const fieldMap = {
    assignee: Assignee,
    select: Select,
    textarea: TextArea,
    'rich-textarea': RichTextArea,
    checkbox: Checkbox,
    checkboxes: CheckboxGroup,
    radios: RadioGroup,
    textfield: TextField,
    date: Date,
  };
  const FieldComponent = fieldMap[type] ? fieldMap[type] : TextField;
  const handlerNamespace = `mercury.formField.${slug}`;

  /**
   * Effect for syncing form value to Gutenberg meta.
   */
  useEffect(() => {
    // Hook for syncing external changes to meta with formik state.
    hooks.addFilter(
      'mercury.postSetMeta',
      handlerNamespace,
      (newValue, field) => {
        if (
          newValue
          && value !== newValue
          && slug === field
        ) {
          setFieldValue(slug, newValue);
        }

        return newValue;
      }
    );

    // Update gutenberg meta.
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
            {required && <RequiredLabel>required</RequiredLabel>}
          </LabelWrapper>
          <InputWrapper>
            <FieldComponent {...props} />
          </InputWrapper>
          {error && <ErrorText>{error}</ErrorText>}
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
  setFieldValue: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

FormField.defaultProps = {
  theme: {},
  readOnly: false,
  required: false,
  setFieldValue: () => {},
};

export default FormField;
