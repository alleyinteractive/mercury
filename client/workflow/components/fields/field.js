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

const Field = (props) => {
  const {
    label,
    slug,
    type,
    readOnly,
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
        {('checkbox' !== type || ('checkbox' === type && readOnly)) && (
          <LabelText>
            {label}
            {readOnly && <span>(Read only)</span>}
          </LabelText>
        )}
        {readOnly
          ? <ReadOnly slug={slug} />
          : <InputWrapper>{getField()}</InputWrapper>
        }
      </Label>
    </Wrapper>
  );
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  slug: PropTypes.string.isRequired,
};

Field.defaultProps = {
  readOnly: false,
};

export default Field;
