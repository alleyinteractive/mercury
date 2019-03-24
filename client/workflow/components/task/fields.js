/* eslint-disable */

import React from 'react';
import { useSelectedTaskSlug } from '../../hooks/tasks';
import { getSelectedTask } from '../../services/tasks';
import Field from '../fields';

const Fields = () => {
  const selectedTaskSlug = useSelectedTaskSlug();
  const {
    name,
    slug,
    fields,
  } = getSelectedTask();

  return (
    <section class="mercury__task__fields">
      {fields.map((field) => <Field {...field} />)}
    </section>
  );
}

export default Fields;
