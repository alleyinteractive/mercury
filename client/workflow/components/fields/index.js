import React from 'react';
import PropTypes from 'prop-types';
// import useMeta from 'hooks/meta';
import Select from './select';
import TextArea from './textarea';
import TextField from './textfield';
import './field.css';

const Field = (props) => {
  const {
    label,
    slug,
    type,
  } = props;

  // const value = useMeta(slug);

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
    <div className="mercury__field">
      <label htmlFor={slug} className="mercury__field__label">
        <span className="mercury__field_label_text">{label}</span>
        {getField()}
      </label>
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Field;
