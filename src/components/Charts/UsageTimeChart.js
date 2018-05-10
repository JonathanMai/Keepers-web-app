// import React, { Component } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';

// class UsageTimeChart extends Component {
//     constructor(props) {
//         super(props);
//         console.log("HERE");
//         this.state = {
//             chartData: {
//                 labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
//                 datasets:[{
//                     label:'Population',
//                     data:[
//                         617594,
//                         181045,
//                         153060,
//                         106519,
//                         105162,
//                         95072
//                     ],
//                     backgroundColor:[
//                         'rgba(255, 99, 132, 0.6)',
//                         'rgba(54, 162, 235, 0.6)',
//                         'rgba(255, 206, 86, 0.6)',
//                         'rgba(75, 192, 192, 0.6)',
//                         'rgba(153, 102, 255, 0.6)',
//                         'rgba(255, 159, 64, 0.6)',
//                         'rgba(255, 99, 132, 0.6)'
//                     ]
//                 }]
//             }
//         }
//     }
    
//     render() {

//         return (
//             <div className="chart">
//                 <Bar
//                     data={this.state.chartData}
//                     height={60}
//                     options={{
//                         maintaninAspectRatio: false
//                     }}
//                 />
//             </div>
//         );

//     }
// }

// export default UsageTimeChart;
import React from 'react';
import { render } from 'react-dom'
import { ResponsiveBar } from 'nivo'
import AbusiveConversationsChart from './AbusiveConversationsChart';

var UsageTimeChart = (props) => {
    let chart = 
        (<ResponsiveBar
            data={[
                {
                  "country": "AD",
                  "hot dog": 90,
                  "hot dogColor": "hsl(230, 70%, 50%)",
                  "burger": 1,
                  "burgerColor": "hsl(230, 70%, 50%)",
                  "sandwich": 191,
                  "sandwichColor": "hsl(64, 70%, 50%)",
                  "kebab": 131,
                  "kebabColor": "hsl(34, 70%, 50%)",
                  "fries": 102,
                  "friesColor": "hsl(346, 70%, 50%)",
                  "donut": 58,
                  "donutColor": "hsl(32, 70%, 50%)"
                },
                {
                  "country": "AE",
                  "hot dog": 15,
                  "hot dogColor": "hsl(1, 70%, 50%)",
                  "burger": 124,
                  "burgerColor": "hsl(267, 70%, 50%)",
                  "sandwich": 66,
                  "sandwichColor": "hsl(359, 70%, 50%)",
                  "kebab": 35,
                  "kebabColor": "hsl(156, 70%, 50%)",
                  "fries": 46,
                  "friesColor": "hsl(155, 70%, 50%)",
                  "donut": 135,
                  "donutColor": "hsl(221, 70%, 50%)"
                },
                {
                  "country": "AF",
                  "hot dog": 123,
                  "hot dogColor": "hsl(77, 70%, 50%)",
                  "burger": 103,
                  "burgerColor": "hsl(5, 70%, 50%)",
                  "sandwich": 126,
                  "sandwichColor": "hsl(115, 70%, 50%)",
                  "kebab": 199,
                  "kebabColor": "hsl(221, 70%, 50%)",
                  "fries": 33,
                  "friesColor": "hsl(95, 70%, 50%)",
                  "donut": 114,
                  "donutColor": "hsl(199, 70%, 50%)"
                },
                {
                  "country": "AG",
                  "hot dog": 182,
                  "hot dogColor": "hsl(225, 70%, 50%)",
                  "burger": 115,
                  "burgerColor": "hsl(224, 70%, 50%)",
                  "sandwich": 148,
                  "sandwichColor": "hsl(101, 70%, 50%)",
                  "kebab": 188,
                  "kebabColor": "hsl(359, 70%, 50%)",
                  "fries": 124,
                  "friesColor": "hsl(95, 70%, 50%)",
                  "donut": 115,
                  "donutColor": "hsl(125, 70%, 50%)"
                },
                {
                  "country": "AI",
                  "hot dog": 163,
                  "hot dogColor": "hsl(16, 70%, 50%)",
                  "burger": 2,
                  "burgerColor": "hsl(70, 70%, 50%)",
                  "sandwich": 45,
                  "sandwichColor": "hsl(229, 70%, 50%)",
                  "kebab": 13,
                  "kebabColor": "hsl(331, 70%, 50%)",
                  "fries": 109,
                  "friesColor": "hsl(115, 70%, 50%)",
                  "donut": 112,
                  "donutColor": "hsl(108, 70%, 50%)"
                },
                {
                  "country": "AL",
                  "hot dog": 62,
                  "hot dogColor": "hsl(192, 70%, 50%)",
                  "burger": 27,
                  "burgerColor": "hsl(22, 70%, 50%)",
                  "sandwich": 181,
                  "sandwichColor": "hsl(106, 70%, 50%)",
                  "kebab": 97,
                  "kebabColor": "hsl(251, 70%, 50%)",
                  "fries": 67,
                  "friesColor": "hsl(271, 70%, 50%)",
                  "donut": 91,
                  "donutColor": "hsl(331, 70%, 50%)"
                },
                {
                  "country": "AM",
                  "hot dog": 131,
                  "hot dogColor": "hsl(230, 70%, 50%)",
                  "burger": 20,
                  "burgerColor": "hsl(85, 70%, 50%)",
                  "sandwich": 199,
                  "sandwichColor": "hsl(253, 70%, 50%)",
                  "kebab": 51,
                  "kebabColor": "hsl(96, 70%, 50%)",
                  "fries": 113,
                  "friesColor": "hsl(255, 70%, 50%)",
                  "donut": 81,
                  "donutColor": "hsl(182, 70%, 50%)"
                }
              ]}
            keys={[
                "hot dog",
                "burger",
                "sandwich",
                "kebab",
                "fries",
                "donut"
            ]}
            indexBy="country"
            margin={{
                "top": 10,
                "right": 10,
                "bottom": 30,
                "left": 30
            }}
            padding={0.3}
            groupMode="grouped"
            // colors={[85,184,242]}
            colors="nivo"
            colorBy="id"
            defs={[
                {
                    "id": "dots",
                    "type": "patternDots",
                    "background": "inherit",
                    "color": "#38bcb2",
                    "size": 4,
                    "padding": 1,
                    "stagger": true
                },
                {
                    "id": "lines",
                    "type": "patternLines",
                    "background": "inherit",
                    "color": "#eed312",
                    "rotation": -45,
                    "lineWidth": 6,
                    "spacing": 10
                }
            ]}
            fill={[
                {
                    "match": {
                        "id": "fries"
                    },
                    "id": "dots"
                },
                {
                    "match": {
                        "id": "sandwich"
                    },
                    "id": "lines"
                }
            ]}
            borderColor="inherit:darker(1.6)"
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "country",
                "legendPosition": "center",
                "legendOffset": 36
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "food",
                "legendPosition": "center",
                "legendOffset": -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    "dataFrom": "keys",
                    "anchor": "bottom-right",
                    "direction": "column",
                    "translateX": 120,
                    "itemWidth": 100,
                    "itemHeight": 20,
                    "itemsSpacing": 2,
                    "symbolSize": 20
                }
            ]}
        />);
    return chart;
}
export default UsageTimeChart;