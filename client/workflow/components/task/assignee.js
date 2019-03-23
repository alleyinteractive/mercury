/* eslint-disable */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { getMeta } from '../../services/fieldHelpers';

const Assignee = () => {
  const assignees = [
    {
      label: 'James',
      value: 'james',
    },
    {
      label: 'Owen',
      value: 'owen',
    },
    {
      label: 'Amy',
      value: 'amy',
    },
  ];

  const [
    assignee,
    setAssignee,
  ] = useState('james');

  const getAssigneeOptions = () => {
    // Build options.
    const options = assignees.map((option) => (
      <option value={option.value}>{option.label}</option>
    ));

    return (
      <label
        className="mercury__footer__label"
        htmlFor="next-assignee"
      >
        <span>Assigned To: </span>
        <select
          id="next-assignee"
          name="next-assignee"
          onChange={setAssignee}
          value={assignee}
        >
          {options}
        </select>
      </label>
    );
  };

  return (
    <div className="mercury__footer__assignee">
      {getAssigneeOptions()}
    </div>
  );
};

export default Assignee;
