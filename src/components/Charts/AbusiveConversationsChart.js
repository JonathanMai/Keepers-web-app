import React from 'react';
import { ResponsiveLine } from 'nivo';

var AbusiveConversationsChart = (props) => {
  console.log(props);
  let line = 
    <ResponsiveLine
    data={[
        {
          "id": "easy",
          "data": props.data[0]
        },
        {
          "id": "medium",
          "data": props.data[1]
        },
        {
          "id": "heavy",
          "data": props.data[2]
        }
      ]}
      colors={["rgb(255,255,0)", "rgb(255,128,0)", "rgb(255,0,0)"]}

      margin={{
        "top": 13,
        "right": 40,
        "bottom": 20,
        "left": 40
    }}
      minY="0"
      curve="monotoneX"
      axisBottom={{
          "orient": "bottom",
          "tickValues": props.tickValues,
          "tickSize": 0,
          "tickPadding": 5

      }}
      axisLeft={{
          "orient": "left",
          "tickSize": 0,
          "tickPadding": 8
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="#ffffff"
      enableDotLabel={true}
      dotLabel="y"
      dotLabelYOffset={-5}
      animate={true}
      motionStiffness={90}
      motionDamping={15}

      // tooltipFormat={
      //   // "DAMN"
      // }

    />
  return line;
}

export default AbusiveConversationsChart;