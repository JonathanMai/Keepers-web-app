import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class UsageTimeChart extends Component {
    constructor(props) {
        super(props);
        this.getTooltipLabel = this.getTooltipLabel.bind(this);
    }

    getTooltipLabel(tooltipItem) {
        let label = "";

        // Data shown in hours.
        if(this.props.type === "h") {
            let time = tooltipItem.yLabel * 60;
            label = Math.floor(tooltipItem.yLabel) + " Hours and " + time % 60 + " Minutes"
        }
        // Data shown in minutes.
        else {
            label += tooltipItem.yLabel + " Minutes"
        }

        return label;
    }

    render() {
        // console.log(this.state.chartData)
        return (
            <div className="chart" style={{position: "relative", height:"100%", width:"inherit"}}>
                <Bar   
                    ref = "chart"
                    data={{                
                        labels: this.props.labels,
                        datasets: [{
                            data: this.props.data,
                            backgroundColor: this.props.data.map(() => {
                                return 'rgba(0, 180, 175, 0.6)'
                            })
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        animation: {easing: 'linear'},
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        tooltips: {
                            intersect: false,
                            borderWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.7)',
                            backgroundColor: "rgb(255, 255, 255)",
                            bodyFontColor: "rgb(0, 0, 0)",
                            displayColors: false,
                            caretSize: 0,
                            callbacks: {
                                title: function() {},
                                label: (tooltipItem, data) => this.getTooltipLabel(tooltipItem)
                            }
                        },
                        // responsive: true,
                        legend: {
                            display: false
                        }
                    }}
                />
            </div>
        );

    }
}

// export default UsageTimeChart;
// import React from 'react';
// import { render } from 'react-dom'
// import { ResponsiveBar } from 'nivo'
// import AbusiveConversationsChart from './AbusiveConversationsChart';
// const colors = {"Facebook": "rgb(56, 84, 255)", "Tinder": "rgb(226, 126, 231)", "WhatsApp": "rgb(58, 214, 64)"}
// var UsageTimeChart = (props) => {
//     let assignColors = [];
//     // console.log(props.datafacebook);
//     props.data.map(key => {
//         let appName = key.appName;
//         // console.log(appName);
//         assignColors.push(colors[key.appName] !== undefined ? colors[key.appName] :  "rgb(" + Math.random()*255 + ", " + Math.random()*255 + ", " + Math.random()*255 + ")");
//     });
//     // console.log(assignColors);
//     let chart = 
//         (<ResponsiveBar
//             data={props.data}
//             keys={props.keys}
//             indexBy="appName"
//             margin={{
//                 "top": 10,
//                 "right": 10,
//                 "bottom": 30,
//                 "left": 30
//             }}
//             padding={0.3}
//             groupMode="stacked"
//             // colors={[85,184,242]}
//             colors={assignColors}
//             colorBy="id"
//             defs={[
//                 {
//                     "id": "dots",
//                     "type": "patternDots",
//                     "background": "inherit",
//                     "color": "#38bcb2",
//                     "size": 4,
//                     "padding": 1,
//                     "stagger": true
//                 },
//                 {
//                     "id": "lines",
//                     "type": "patternLines",
//                     "background": "inherit",
//                     "color": "#eed312",
//                     "rotation": -45,
//                     "lineWidth": 6,
//                     "spacing": 10
//                 }
//             ]}
//             fill={[
//                 {
//                     "match": {
//                         "id": "fries"
//                     },
//                     "id": "dots"
//                 },
//                 {
//                     "match": {
//                         "id": "sandwich"
//                     },
//                     "id": "lines"
//                 }
//             ]}
//             borderColor="inherit:darker(1.6)"
//             axisBottom={{
//                 "orient": "bottom",
//                 "tickSize": 0,
//                 "tickPadding": 5
//             }}
//             axisLeft={{
//                 "orient": "left",
//                 "tickSize": 0,
//                 "tickPadding": 5
//             }}
//             labelSkipWidth={12}
//             labelSkipHeight={12}
//             labelTextColor="inherit:darker(1.6)"
//             animate={true}
//             motionStiffness={90}
//             motionDamping={15}
//             // isInteractive={false}
//             // tooltip={data: "fuck"}
//             tooltip={function(e){console.log(e)}}

//             margin={{
//                 "top": 10,
//                 "right": 40,
//                 "bottom": 25,
//                 "left": 40
//             }}
//             // legends={[
//             //     {
//             //         "dataFrom": "keys",
//             //         "anchor": "bottom-right",
//             //         "direction": "column",
//             //         "translateX": 120,
//             //         "itemWidth": 100,
//             //         "itemHeight": 20,
//             //         "itemsSpacing": 2,
//             //         "symbolSize": 20
//             //     }
//             // ]}
//         />);
//     return chart;
// }
export default UsageTimeChart;