import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import RichTextEditor from './richTextEditor';

const RichTextArea = (props) => {
  const {
    slug,
    readOnly,
  } = props;

  return (
    <Field
      component={RichTextEditor}
      id={slug}
      name={slug}
      readOnly={readOnly}
    />
  );
};

RichTextArea.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default RichTextArea;
