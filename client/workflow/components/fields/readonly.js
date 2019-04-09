import React from 'react';
import PropTypes from 'prop-types';
import useMeta from 'hooks/meta';
import { ReadOnlyText } from './fieldStyles.js';

const ReadOnly = (props) => {
  const { slug } = props;
  const value = useMeta(slug);

  return (
    <ReadOnlyText>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      Value: <strong>{value || 'none'}</strong>
      <input
        type="hidden"
        value={value}
        name={slug}
      />
    </ReadOnlyText>
  );
};

ReadOnly.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default ReadOnly;
