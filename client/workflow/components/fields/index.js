import React from 'react';
import PropTypes from 'prop-types';
import Select from './select';
import TextArea from './textarea';
import TextField from './textfield';
import {
  Wrapper,
  Label,
  LabelText,
  Input,
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
      case 'textfield':
      default:
        return (<TextField {...props} />);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor={slug}>
        <LabelText>{label}</LabelText>
        <Input>{getField()}</Input>
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
