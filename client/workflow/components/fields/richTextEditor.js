import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({
  form: { setFieldValue },
  field: { value, onBlur },
  id,
  readOnly,
}) => (
  <ReactQuill
    value={value}
    id={id}
    readOnly={readOnly}
    onChange={(newValue) => {
      setFieldValue(id, newValue);
    }}
    onBlur={onBlur}
    modules={readOnly ? { toolbar: false } : {}}
  />
);

RichTextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  field: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default RichTextEditor;
