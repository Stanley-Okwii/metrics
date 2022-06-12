import React from 'react';
import { shallow } from 'enzyme';
import moment from "moment";

import ToolTip from '../../components/common/toolTip';

describe('ToolTip ', () => {
  const props = {
    classes: {},
    item: {
      start: moment().subtract(1, "HOUR"),
      end: moment().add(1, "HOUR"),
      x1: 2,
      x2: 5,
      metrics: [5],
    },
    metricsDefinition: {
      count: 1,
      legends: ["Temperature"],
      colors: [
        {
          fill: "#66b2b2",
          stroke: "#006666",
          text: "#006666",
        },
      ],
    },
    onFormatTimeToolTips: () => {},
    onFormatMetricLegend: () => {},
  };

  it('should render correctly', () => {
    const toolTip = shallow(
      <ToolTip {...props} />,
    );
    expect(toolTip).toMatchSnapshot();
  });
});
