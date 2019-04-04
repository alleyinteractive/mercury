import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import {
  TextFieldWrapper,
} from './fieldStyles.js';

const TextField = (props) => {
  const {
    slug,
    readOnly,
  } = props;

  const value = useMeta(slug);

  return (
    <TextFieldWrapper>
      <Field
        type="text"
        id={slug}
        name={slug}
        onChange={(event) => setMeta(slug, event.target.value)}
        value={value}
        readOnly={readOnly}
      />
    </TextFieldWrapper>
  );
};

TextField.propTypes = {
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

TextField.defaultProps = {
  readOnly: false,
};

export default TextField;
