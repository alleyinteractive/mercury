/* eslint-disable */

import React from 'react';
import { Field } from 'formik';
import { setMeta } from '../../services/meta';
import useMeta from '../../hooks/meta';

const Select = (props) => {
  const {
    slug,
    readyOnly,
    optionsSource,
    optionsSourceList,
    optionsFirstEmpty,
  } = props;

  const value = useMeta(slug);

  const getOptions = () => {
    let options = optionsSourceList.map((option) =>
      <option value={option.value}>{option.label}</option>
    );
    if (optionsFirstEmpty) {
      options.shift(<option disabled selected value></option>);
    }
    return options;
  }

  if (readyOnly) {
    return (
      <div class="mercury__field__readyonly">
        {value}
      </div>
    );
  }

  return (
    <Field
      className="mercury__field__select"
      component="select"
      id={slug}
      name={slug}
      value={value}
      onChange={(event) => setMeta(slug, event.target.value)}
    >
      {getOptions()}
    </Field>
  );
};

export default Select;
