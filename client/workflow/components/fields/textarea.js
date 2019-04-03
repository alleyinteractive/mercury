/* eslint-disable */

import React from 'react';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';

const Textarea = (props) => {
  const {
    slug,
  } = props;

  const value = useMeta(slug);

  return (
     <textarea
      className="mercury__field__textarea"
      id={slug}
      name={slug}
      onChange={(event) => setMeta(slug, event.target.value)}
      defaultValue={value}
    />
  );
};

export default Textarea;
