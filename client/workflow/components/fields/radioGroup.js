import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { setMeta } from 'services/meta';
import useMeta from 'hooks/meta';
import {
  GroupWrapper,
  InlineLabel,
  OptionText,
} from './fieldStyles.js';

const RadioGroup = (props) => {
  const {
    slug,
    optionsSourceList,
    readOnly,
  } = props;
  const value = useMeta(slug);

  if (! optionsSourceList || ! optionsSourceList.length) {
    return null;
  }

  return (
    <GroupWrapper>
      {optionsSourceList.map((field) => {
        const { label, value: optionValue } = field;

        return (
          <InlineLabel key={optionValue}>
            <Field
              type="radio"
              id={optionValue}
              name={slug}
              checked={value === optionValue}
              onChange={(event) => setMeta(slug, event.target.value)}
              value={optionValue}
              readOnly={readOnly}
            />
            <OptionText>{label}</OptionText>
          </InlineLabel>
        );
      })}
    </GroupWrapper>
  );
};

RadioGroup.propTypes = {
  optionsSourceList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  slug: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

RadioGroup.defaultProps = {
  readOnly: false,
};

export default RadioGroup;
