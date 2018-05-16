import React from 'react';
import { ResponsiveLine } from 'nivo';

var AbusiveConversationsChart = (props) => {
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
          "top": 10,
          "right": 10,
          "bottom": 30,
          "left": 30
      }}
      minY="0"
      curve="monotoneX"
      axisBottom={{
          "orient": "bottom",
          "tickSize": 0,
          "tickPadding": 8,
          "tickRotation": 0,

      }}
      axisLeft={{
          "orient": "left",
          "tickSize": 0,
          "tickPadding": 8,
          "tickRotation": 0,
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="#ffffff"
      enableDotLabel={true}
      dotLabel="y"
      dotLabelYOffset={-12}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
          {
              "anchor": "bottom-right",
              "direction": "column",
              "translateX": 100,
              "itemWidth": 80,
              "itemHeight": 20,
              "symbolSize": 12,
              "symbolShape": "circle"
          }
      ]}
    />
  return line;
}

export default AbusiveConversationsChart;