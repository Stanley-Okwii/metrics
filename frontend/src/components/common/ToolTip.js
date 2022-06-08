import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import React from "react";

const useStyles = makeStyles({
  innerTipMetrics: {
    marginTop: 4,
  },
  innerTipLeft: {
    marginRight: 4,
    display: "inline-block",
  },
  innerTipRight: {
    display: "inline-block",
    float: "right",
  },
});

const Tooltip = ({
  metricsDefinition,
  item,
  onFormatTimeToolTips,
  onFormatMetricLegend,
  classes,
}) => {
  const defaultClasses = useStyles();
  const className = (className) =>
    clsx(defaultClasses[className], classes[className]);

  return (
    <>
      <div>
        <div className={className("innerTipLeft")}>
          From:
          <br />
          To:
        </div>
        <div className={className("innerTipRight")}>
          {onFormatTimeToolTips(item.start)}
          <br />
          {onFormatTimeToolTips(item.end)}
        </div>
      </div>
      <div className={className("innerTipMetrics")}>
        {metricsDefinition.colors.map((_, m) => {
          const reversed = metricsDefinition.colors.length - m - 1;
          return (
            <div key={reversed}>
              <span>{metricsDefinition.legends[reversed]} :</span>
              <span className={className("innerTipRight")}>
                {onFormatMetricLegend(item.metrics[reversed])}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

Tooltip.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.shape({
    start: PropTypes.instanceOf(moment).isRequired,
    end: PropTypes.instanceOf(moment).isRequired,
    x1: PropTypes.number,
    x2: PropTypes.number,
    metrics: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  metricsDefinition: PropTypes.shape({
    count: PropTypes.number.isRequired,
    legends: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        fill: PropTypes.string.isRequired,
        stroke: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onFormatTimeToolTips: PropTypes.func.isRequired,
  onFormatMetricLegend: PropTypes.func.isRequired,
};

export default Tooltip;
