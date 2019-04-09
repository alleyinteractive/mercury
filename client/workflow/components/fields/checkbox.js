import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import {
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const Checkbox = (props) => {
  const {
    label,
    slug,
    readOnly,
  } = props;
  const value = useMeta(slug);

  return (
    <InlineLabel>
      <Field
        type="checkbox"
        id={slug}
        name={slug}
        checked={value === slug}
        onChange={(event) => {
          const newValue = ! event.target.checked ? '' : event.target.value;
          setMeta(slug, newValue);
        }}
        value={slug}
        readOnly={readOnly}
      />
      <OptionText>{label}</OptionText>
    </InlineLabel>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

Checkbox.defaultProps = {
  readOnly: false,
};

export default Checkbox;
