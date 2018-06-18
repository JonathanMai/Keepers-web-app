import React from 'react';
import { Line } from 'react-chartjs-2';

/*
    Abusive conversation chart draws a chart of the word count statistics.
    In the chart the user can see the number of offensive words sent/received by his child.
    The words are calssified as easy/medium/harsh words.
*/
var AbusiveConversationsChart = (props) => {
    let line = 
        <div className="chart" style={{position: "relative", height:"100%", width:"inherit"}}>
            <Line
                id="line"
                data={{
                    labels: props.labels, // x labels.
                    datasets:[
                        // Words callsified as easy level.
                        {
                            label:["Easy"],
                            data: props.data[0],
                            borderColor: 'rgb(255, 230, 100)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 230, 100)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2
                        },
                        // Words callsified as medium level.
                        {
                            label:["Medium"],
                            data: props.data[1],
                            borderColor: 'rgb(255, 128, 0)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 128, 0)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2

                        },
                        // Words callsified as harsh level.
                        {                 
                            label:["Harsh"],
                            data: props.data[2],
                            borderColor: 'rgb(255, 0, 0)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 0, 0)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2

                        }
                    ],
                }}
                options={{
                    title: {display: false}, // no title for the chart.
                    elements: {
                        line: {
                            tension: 0.5, // disables bezier curves
                            borderJoinStyle: 'round',
                            fill: false,
                            borderWidth: 1
                        }
                    },
                    maintainAspectRatio: false, // Helps making the chart responsive
                    animation: {
                        duration: 500,
                        easing: 'linear'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: (value) =>{if(Number.isInteger(value)) return (value)} // returns the y tick label only if its a whole number.
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },

                    // Tooltip options
                    tooltips: {
                        titleFontColor: "rgb(0, 0, 0)",
                        intersect: false,
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.7)',
                        backgroundColor: "rgb(255, 255, 255)",
                        bodyFontColor: "rgb(0, 0, 0)",
                        bodyFontSize: 10,
                        displayColors: false,
                        caretSize: 0,
                        mode: 'index'
                    },

                    // Disables the legend.
                    legend: {
                        display: false
                    },
                }}
                />
        </div>
    return line;
  }

  export default AbusiveConversationsChart;