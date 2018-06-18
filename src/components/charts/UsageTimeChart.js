import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

/*
    Usage time chart draws a chart of usage data.
    In the chart the user can see the child usage data - how much time he spent on facebook, WhatsApp etc.
    The data shown in minuts/hours and shows the application which the child used.
*/

class UsageTimeChart extends Component {
    constructor(props) {
        super(props);
        // Bind functions.
        this.getTooltipLabel = this.getTooltipLabel.bind(this);
    }

    render() {
        return (
            <div className="chart" style={{position: "relative", height:"100%", width:"inherit"}}>
                <Bar   
                    ref = "chart"
                    // Data that will be drawn on the chart.
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
                                    beginAtZero: true,
                                    callback: (value) =>{if(Number.isInteger(value)) return (value+this.props.type)} // Shows only whole numbers.
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize: 10
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
                                label: (tooltipItem) => this.getTooltipLabel(tooltipItem)
                            }
                        },
                        legend: {
                            display: false
                        }
                    }}
                />
            </div>
        );

    }

    // Tooltip label - returns the tooltip label content.
    // Gets the tooltip item and returns the new label.
    getTooltipLabel(tooltipItem) {
        let label = "";
         // Data shown in hours.
        if(this.props.type === "h") {
            let time = tooltipItem.yLabel * 60;
            label = Math.ceil(tooltipItem.yLabel) + " Hours and " + Math.ceil(time % 60) + " Minutes"
        }
        // Data shown in minutes.
        else {
            label += tooltipItem.yLabel + " Minutes"
        }
        return label;
    }
}

export default UsageTimeChart;