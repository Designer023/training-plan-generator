import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  // DateRangePicker,
  SingleDatePicker
  // DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

const DatePicker = props => {
  const { input } = props;
  const { onChange, value, name } = input;

  const [focused, setFocused] = useState(null);

  const { t } = useTranslation();

  const dateFormat = t("date.format.medium", { date: value });

  return (
    <SingleDatePicker
      date={value}
      onDateChange={date => onChange(date.startOf("day"))}
      numberOfMonths={1}
      focused={focused}
      onFocusChange={({ focused }) => setFocused(focused)}
      id={`id_${name}`}
      displayFormat={dateFormat}
      isOutsideRange={date => date.isBefore(moment(), "day")}
      isDayBlocked={date => date.isoWeekday() !== 6 && date.isoWeekday() !== 7}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  );
};

export default DatePicker;
