import React from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import TextArea from './textarea';
import TextField from './textfield';
import Checkbox from './checkbox';
import CheckboxGroup from './checkboxGroup';
import RadioGroup from './radioGroup';
import {
  Wrapper,
  Label,
  LabelText,
  InputWrapper,
} from './fieldStyles.js';

const Field = (props) => {
  const {
    label,
    slug,
    type,
  } = props;

  const getField = () => {
    switch (type) {
      case 'select':
        return (<Select {...props} />);

      case 'textarea':
        return (<TextArea {...props} />);

      case 'checkbox':
        return (<Checkbox {...props} />);

      case 'checkboxes':
        return (<CheckboxGroup {...props} />);

      case 'radios':
        return (<RadioGroup {...props} />);

      case 'textfield':
      default:
        return (<TextField {...props} />);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor={slug}>
        {'checkbox' !== type && <LabelText>{label}</LabelText>}
        <InputWrapper>{getField()}</InputWrapper>
      </Label>
    </Wrapper>
  );
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Field;
