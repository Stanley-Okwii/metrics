import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeYear,
} from "d3-time";
import { formatLocale } from "d3-format";
import { timeFormat } from "d3-time-format";
import _padStart from "lodash-es/padStart";
import moment from "moment";

const formatMillisecond = timeFormat(".%L"), // .456
  formatSecond = timeFormat(":%S"), // :43
  formatMinute = timeFormat("%H:%M"), // 13:12
  formatHour = timeFormat("%H:00"), // 13:00
  formatDay = timeFormat("%b %d"), // Nov 02
  formatMonth = timeFormat("%b %d"), // Nov 01
  formatYear = timeFormat("%Y %b %d");
export const multiFormat = (date) => {
  return (
    timeSecond(date) < date
      ? formatMillisecond
      : timeMinute(date) < date
      ? formatSecond
      : timeHour(date) < date
      ? formatMinute
      : timeDay(date) < date
      ? formatHour
      : timeMonth(date) < date
      ? formatDay
      : timeYear(date) < date
      ? formatMonth
      : formatYear
  )(date);
};

const locale = formatLocale({
  decimal: ".",
  thousands: " ",
  grouping: [3],
});

export const formatNumber = (number, pad, plus) => {
  const formatted = locale.format(plus ? `+,d` : `,d`)(number);
  if (!pad) {
    return formatted;
  } else {
    return _padStart(formatted, pad);
  }
};

export const TIME_FORMAT_TOOLTIP = "h:mm:ss A, DD-MMM-YYYY ";

export const formatToolTipTime = (time) => {
  return moment(time).second(0).millisecond(0).format(TIME_FORMAT_TOOLTIP);
};

export const calculateAverage = (array) =>
  array.reduce((n, m) => n + m, 0) / array.length;

export const aggregateAverageMetrics = (data, intervalType) => {
  const timeValueObj = {};
  data.forEach((metric) => {
    let key = moment(metric.time_stamp).millisecond(0).second(0);
    if (intervalType === "minute") {
      key = moment(metric.time_stamp).millisecond(0).second(0).minute(0);
    }
    if (intervalType === "hour") {
      key = moment(metric.time_stamp)
        .millisecond(0)
        .second(0)
        .minute(0)
        .hour(0);
    }

    const values = timeValueObj[key];
    if (values) {
      values.push(metric?.value);
      timeValueObj[key] = values;
    } else {
      timeValueObj[key] = [metric?.value];
    }
  });

  const items = Object.entries(timeValueObj).map(([key, value]) => ({
    time: moment(key),
    metrics: [calculateAverage(value)],
    total: calculateAverage(value),
  }));
  return items;
};
