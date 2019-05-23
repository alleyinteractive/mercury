import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const DatePicker = ({
  form: { setFieldValue },
  field: { value },
  id,
  readOnly,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const momentObject = value ? moment(value) : null;

  return (
    <SingleDatePicker
      date={momentObject}
      onDateChange={(date) => {
        setFieldValue(id, date);
      }}
      focused={isFocused}
      onFocusChange={({ focused }) => {
        setIsFocused(focused);
      }}
      id={id}
      readOnly={readOnly}
      showClearDate
    />
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  field: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default DatePicker;
