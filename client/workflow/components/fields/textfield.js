/* eslint-disable */

import React from 'react';
import { Field } from 'formik';
import { setMeta } from '../../services/meta';
import useMeta from '../../hooks/meta';

const Textfield = (props) => {
  const {
    slug,
    readyOnly,
  } = props;

  const value = useMeta(slug);

  return (
    <Field
      className="mercury__field__input"
      type="text"
      id={slug}
      name={slug}
      onChange={(event) => setMeta(slug, event.target.value)}
      value={value}
      readonly={readyOnly}
    />
  );
};

export default Textfield;
