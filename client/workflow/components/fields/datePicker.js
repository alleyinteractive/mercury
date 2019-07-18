import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { OPEN_UP } from 'react-dates/lib/constants';

import 'react-dates/lib/css/_datepicker.css';

const DatePicker = ({
  form: { setFieldValue },
  field: { value },
  id,
  readOnly,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const momentObject = value ? moment.unix(value) : null;

  return (
    <SingleDatePicker
      date={momentObject}
      onDateChange={(date) => {
        setFieldValue(id, date ? date.unix() : '');
      }}
      focused={isFocused}
      onFocusChange={({ focused }) => {
        setIsFocused(focused);
      }}
      id={id}
      readOnly={readOnly}
      disabled={readOnly}
      showClearDate
      isOutsideRange={() => false}
      openDirection={OPEN_UP}
    />
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  field: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default DatePicker;
