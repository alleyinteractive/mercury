/* eslint-disable */

import React from 'react';
import { useSelectedTaskSlug } from '../../hooks/tasks';
import { getTask, getSelectedTask } from '../../services/tasks';
import Field from '../fields';

const Fields = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const {
    name,
    slug,
    fields,
  } = getSelectedTask();

  if (! fields || 0 === fields.length) {
    return (
      <section class="mercury__task__fields">
        <p>No custom fields for this task. Proceed to the next task whenever ready.</p>
      </section>
    );
  }

  return (
    <section class="mercury__task__fields">
      {fields.map((field) => <Field {...field} />)}
    </section>
  );
}

export default Fields;
