/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import SpiderTimeLine from "@spider-analyzer/timeline";

import {
  formatNumber,
  multiFormat,
  formatToolTipTime,
  aggregateAverageMetrics,
} from "./utils";
import Tooltip from "./common/toolTip";

const metricsDefinition = {
  count: 1,
  legends: ["Temperature (°C)"],
  colors: [
    {
      fill: "#66b2b2",
      stroke: "#006666",
      text: "#006666",
    },
  ],
};

const initialState = {
  timeSpan: {
    start: moment().subtract(1, "HOUR"),
    stop: moment().add(1, "HOUR"),
  },
  items: [],
  intervalMs: null,
  domains: [],
  maxDomain: {
    min: moment().subtract(1, "DAY").startOf("DAY"),
    max: moment().add(1, "DAY").endOf("DAY"),
  },
};

const TimeLine = () => {
  const [state, setState] = useState(initialState);
  const metricsData = useSelector((state) => state.metrics?.metrics?.data);
  const newMetric = useSelector((state) => state.metrics?.addedMetric?.data);

  const getDomain = () => {
    const start = metricsData && metricsData[0];
    const end = metricsData && metricsData[metricsData.length - 1];

    return {
      min: start
        ? moment(start.time_stamp).subtract(1, "HOUR")
        : moment().subtract(1, "WEEK"),
      max: end ? moment(end.time_stamp).add(1, "HOUR") : moment().endOf("DAY"),
    };
  };

  const getMaxDomain = () => {
    const start = metricsData && metricsData[0];
    const end = metricsData && metricsData[metricsData.length - 1];

    return {
      min: start
        ? moment(start.time_stamp).subtract(1, "HOUR")
        : moment().subtract(2, "DAY").startOf("DAY"),
      max: end
        ? moment(end.time_stamp).add(1, "HOUR")
        : moment().add(1, "DAY").endOf("DAY"),
    };
  };

  const onLoadDefaultDomain = () => {
    setState({
      ...state,
      domains: [getDomain()],
      maxDomain: getMaxDomain(),
    });
  };

  const getItems = () => {
    const intervalMin =
      (state.intervalMs > 60000 ? Math.floor(state.intervalMs / 60000) : 1) *
      5;
    const intervalHour = intervalMin / 60;
    let items = [];

    if (metricsData.length) {
      if (intervalHour < 1) {
        // less than 1 hour, average per minute
        items = aggregateAverageMetrics(metricsData);
      }

      if (intervalHour < 24) {
        // less than a day average per hour
        items = aggregateAverageMetrics(metricsData, "minute");
      }
      if (intervalHour >= 24) {
        // more than a day average per day
        items = aggregateAverageMetrics(metricsData, "hour");
      }
    }

    return items;
  };

  const getAllMetrics = (intervalMs) => {
    setState({
      ...state,
      intervalMs,
      items: getItems(),
    });
  };

  useEffect(() => {
    if (Object.keys(newMetric)) {
      setState({
        ...state,
        items: getItems(),
        domains: [getDomain()],
        maxDomain: getMaxDomain(),
      });
    }
  }, [newMetric]);

  const onChangeCustomZoomRange = (start, stop) => {
    start = moment(start).millisecond(0).second(0);
    stop = moment(stop).millisecond(0).second(0);

    setState({
      ...state,
      timeSpan: {
        start,
        stop,
      },
    });
  };

  const onUpdateDomains = (domains) => {
    setState({
      ...state,
      domains,
    });
  };

  const onResetTime = () => {
    setState({
      ...state,
      domains: [getDomain()],
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SpiderTimeLine
        timeSpan={state.timeSpan}
        histo={{
          items: state.items,
          intervalMs: state.intervalMs,
        }}
        showHistoToolTip
        HistoToolTip={Tooltip}
        zoomOutFactor={2}
        domains={state.domains}
        maxDomain={state.maxDomain}
        metricsDefinition={metricsDefinition}
        biggestVisibleDomain={moment.duration("P1M")}
        biggestTimeSpan={moment.duration("P7D")}
        smallestResolution={moment.duration("PT1M")}
        fetchWhileSliding
        selectBarOnClick
        xAxis={{
          spaceBetweenTicks: 70,
          barsBetweenTicks: 5,
          height: 30,
        }}
        yAxis={{
          spaceBetweenTicks: 28,
          showGrid: true,
        }}
        margin={{
          top: 20,
          bottom: 20,
        }}
        onLoadDefaultDomain={onLoadDefaultDomain}
        onLoadHisto={getAllMetrics}
        onCustomRange={onChangeCustomZoomRange}
        onShowMessage={toast.error}
        onUpdateDomains={onUpdateDomains}
        onResetTime={onResetTime}
        onFormatTimeToolTips={formatToolTipTime}
        onFormatTimeLegend={multiFormat}
        onFormatMetricLegend={formatNumber}
      />
    </div>
  );
};

export default TimeLine;
