import React from 'react';
import Field from 'components/fields';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getTask } from 'services/tasks';
import { Wrapper, FieldWrapper } from './fieldsStyles';

const Fields = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const { fields } = getTask(selectedTaskSlug);

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
          <FieldWrapper>
            <Field {...field} key={slug} />
          </FieldWrapper>
        );
      })}
    </Wrapper>
  );
};

export default Fields;
