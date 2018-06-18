import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

var AbusiveConversationsChart = (props) => {
    let line = 
        <div className="chart" style={{position: "relative", height:"100%", width:"inherit"}}>
            <Line
                id="line"
                data={{
                    labels: props.labels,
                    datasets:[
                        // Level 1 words - lowest words
                        {
                            label:['level 1'],
                            data: props.data[0],
                            borderColor: 'rgb(255, 230, 100)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 230, 100)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2
                        },
                        // Level 2 words - medium words
                        {
                            label:['level 2'],
                            data: props.data[1],
                            borderColor: 'rgb(255, 128, 0)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 128, 0)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2

                        },
                        // Level 3 words - worst words
                        {                 
                            label:['level 3'],
                            data: props.data[2],
                            borderColor: 'rgb(255, 0, 0)',
                            pointRadius: 6,
                            pointBackgroundColor: 'rgb(255, 0, 0)', 
                            pointBorderColor: 'rgb(255, 255, 255)',
                            pointBorderWidth: 2

                        }
                    ],
                }}
                backgroundColor={"transperant"}
                options={{
                    // scaleLabel: "fuck",
                    title: {display: false},
                    elements: {
                        line: {
                            tension: 0.5, // disables bezier curves
                            borderJoinStyle: 'round',
                            fill: false,
                            borderWidth: 1
                        }
                    },
                    maintainAspectRatio: false,
                    animation: {
                        duration: 100,
                        easing: 'easeInCubic'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 10
                            }
                        }]
                    },
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
                    callbacks: {
                        title: function() {},
                        label: (tooltipItem, data) => this.getTooltipLabel(tooltipItem)
                    },
                    legend: {
                        display: false
                    },
                }}
                />
        </div>
    return line;
  }

  export default AbusiveConversationsChart;