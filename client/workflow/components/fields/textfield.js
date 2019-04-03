import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';

const TextField = (props) => {
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
      readOnly={readyOnly}
    />
  );
};

TextField.propTypes = {
  slug: PropTypes.string.isRequired,
  readyOnly: PropTypes.bool.isRequired,
};

export default TextField;
