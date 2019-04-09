import React from 'react';
import PropTypes from 'prop-types';
import Field from 'components/fields/field';
import { Wrapper, FieldWrapper } from './fieldsStyles';

const Fields = (props) => {
  const {
    fields,
    handleChange,
    setFieldValue,
    values,
  } = props;

  if (! fields || 0 === fields.length) {
    return (
      <Wrapper>
        {/* eslint-disable-next-line max-len */}
        <p>No custom fields for this task. Proceed to the next task whenever ready.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {fields.map((field) => {
        const { slug } = field;

        return (
          <FieldWrapper key={slug}>
            <Field
              {...field}
              value={values[slug]}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
            />
          </FieldWrapper>
        );
      })}
    </Wrapper>
  );
};

Fields.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
};

export default Fields;
