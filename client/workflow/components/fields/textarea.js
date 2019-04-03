import React from 'react';
import PropTypes from 'prop-types';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';

const TextArea = (props) => {
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

TextArea.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default TextArea;
