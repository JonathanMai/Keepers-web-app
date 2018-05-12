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
const colors = {"Facebook": "rgb(56, 84, 255)", "Tinder": "rgb(226, 126, 231)", "WhatsApp": "rgb(58, 214, 64)"}
var UsageTimeChart = (props) => {
    let assignColors = [];
    // console.log(props.datafacebook);
    props.data.map(key => {
        let appName = key.appName;
        // console.log(appName);
        assignColors.push(colors[key.appName] !== undefined ? colors[key.appName] :  "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")");
    });
    // console.log(assignColors);
    let chart = 
        (<ResponsiveBar
            data={props.data}
            keys={props.keys}
            indexBy="appName"
            margin={{
                "top": 10,
                "right": 10,
                "bottom": 30,
                "left": 30
            }}
            padding={0.3}
            groupMode="stacked"
            // colors={[85,184,242]}
            colors={assignColors}
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
            // axisBottom={{
            //     "orient": "bottom",
            //     "tickSize": 5,
            //     "tickPadding": 5,
            //     "tickRotation": 0,
            //     "legend": "country",
            //     "legendPosition": "center",
            //     "legendOffset": 36
            // }}
            // axisLeft={{
            //     "orient": "left",
            //     "tickSize": 5,
            //     "tickPadding": 5,
            //     "tickRotation": 0,
            //     "legend": "food",
            //     "legendPosition": "center",
            //     "legendOffset": -40
            // }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={false}
            // legends={[
            //     {
            //         "dataFrom": "keys",
            //         "anchor": "bottom-right",
            //         "direction": "column",
            //         "translateX": 120,
            //         "itemWidth": 100,
            //         "itemHeight": 20,
            //         "itemsSpacing": 2,
            //         "symbolSize": 20
            //     }
            // ]}
        />);
    return chart;
}
export default UsageTimeChart;