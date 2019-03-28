/* eslint-disable */

import React from 'react';
import { useSelectedTaskSlug } from '../../hooks/tasks';
import { getTask, getSelectedTask } from '../../services/tasks';
import Field from '../fields';

const Fields = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  console.log(selectedTaskSlug);
  const {
    name,
    slug,
    fields,
  } = getSelectedTask();
  console.log(getSelectedTask());

  if (! fields || 0 === fields.length) {
    return (
      <p>No custom fields for this task. Proceed to the next task whenever ready.</p>
    );
  }

  return (
    <section class="mercury__task__fields">
      {fields.map((field) => <Field {...field} />)}
    </section>
  );
}

export default Fields;
