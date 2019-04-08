import React from 'react';
import PropTypes from 'prop-types';
import { setMeta } from 'services/meta';
import { Field } from 'formik';
import useMeta from 'hooks/meta';
import {
  TextAreaWrapper,
} from './fieldStyles.js';

const TextArea = (props) => {
  const {
    slug,
  } = props;

  const value = useMeta(slug);

  return (
    <TextAreaWrapper>
      <Field
        component="textarea"
        id={slug}
        name={slug}
        onChange={(event) => setMeta(slug, event.target.value)}
        defaultValue={value}
      />
    </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextArea;
