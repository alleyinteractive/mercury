/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';
import { setMeta } from '../../services/meta';
import useMeta from '../../hooks/meta';
import Select from './select';
import Textarea from './textarea';
import Textfield from './textfield';
import './field.css';

const Field = (props) => {
  const {
    label,
    slug,
    type,
  } = props;

  const value = useMeta(slug);

  const getField = () => {
    switch (type) {
      case 'select':
        return (<Select {...props} />);
      case 'textarea':
        return (<Textarea {...props} />);
      case 'textfield':
      default:
        return (<Textfield {...props} />);
    }
  }

  return (
    <div className="mercury__field">
      <label htmlFor={slug} className="mercury__field__label">
        <span className="mercury__field_label_text">{label}</span>
        {getField()}
      </label>
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Field;
