import React from 'react';
import { useSelectedTaskSlug } from 'hooks/tasks';
import { getTask } from 'services/tasks';
import Field from 'components/fields';

const Fields = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const { fields } = getTask(selectedTaskSlug);

  if (! fields || 0 === fields.length) {
    return (
      <section className="mercury__task__fields">
        {/* eslint-disable-next-line max-len */}
        <p>No custom fields for this task. Proceed to the next task whenever ready.</p>
      </section>
    );
  }

  return (
    <section className="mercury__task__fields">
      {fields.map((field) => {
        const { slug } = field;

        return <Field {...field} key={slug} />;
      })}
    </section>
  );
};

export default Fields;
