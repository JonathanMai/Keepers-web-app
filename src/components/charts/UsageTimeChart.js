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
            label = Math.ceil(tooltipItem.yLabel) + " Hours and " + Math.ceil(time % 60) + " Minutes"
        }
        // Data shown in minutes.
        else {
            label += tooltipItem.yLabel + " Minutes"
        }

        return label;
    }

    render() {
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
                                    // callback: function(value, index, values) {
                                    //     return '$' + value;
                                    // }
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
                                label: (tooltipItem, data) => this.getTooltipLabel(tooltipItem)
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
}
export default UsageTimeChart;