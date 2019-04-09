import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { setMeta } from 'services/meta';
import FormField from 'components/fields/field';
import { connect } from 'formik';
import { Wrapper, FieldWrapper } from './fieldsStyles';

const Fields = (props) => {
  const {
    fields,
    formik: { values: formikState },
    handleChange,
    setFieldValue,
    values,
  } = props;

  // Save fields to gutenberg meta on change.
  useEffect(() => {
    setMeta(formikState);
  }, [formikState]);

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
            <FormField
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
  formik: PropTypes.shape({
    values: PropTypes.object.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
};

export default connect(Fields);
