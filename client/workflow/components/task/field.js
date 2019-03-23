import React, { useState } from 'react';
import { Field as FormikField } from 'formik';
import PropTypes from 'prop-types';
import { getMeta, setMeta } from '../../services/fieldHelpers';
import './field.css';

const Field = (props) => {
  const {
    label,
    slug,
  } = props;

  const [value, setValue] = useState(getMeta(slug));

  return (
    <div className="mercury__field">
      <label htmlFor={slug} className="mercury__field__label">
        <span className="mercury__field_label_text">{label}</span>
        <FormikField
          className="mercury__field__input"
          type="text"
          id={slug}
          name={slug}
          onChange={(event) => {
            setMeta(slug, event.target.value);
            setValue(event.target.value);
          }}
          value={value}
        />
      </label>
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Field;
