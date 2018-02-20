import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class AbusiveConversationsChart extends Component {
    constructor(props) {
        super(props);
        console.log("HERE");
        this.state = {
            chartData: {
                labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                    // Level 1 words - lowest words
                    {
                        label:['level 1'],
                        data:[
                            95072,
                            106519,
                            181045,
                            105162,
                            480022,
                            9507,
                            153060
                        ],
                        borderColor: 'rgba(255, 230, 100, 1)',
                        pointRadius: 2,
                        fill: false
                    },
                    // Level 2 words - medium words
                    {
                        label:['level 2'],
                        data:[
                            95072,
                            153060,
                            181045,
                            153060,
                            106519,
                            105162
                        ],
                        borderColor: 'rgba(255, 128, 0, 1)',
                        pointRadius: 2,
                        fill: false
                    },
                    // Level 3 words - worst words
                    {                 
                    label:['level 3'],
                    data:[
                        617594,
                        181045,
                        153060,
                        106519,
                        105162,
                        95072
                    ],
                    borderColor: 'rgba(255, 0, 0, 1)',
                    pointRadius: 2,
                    fill: false
            }]
            }
        }
    }
    
    render() {

        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    height={60}
                    
                    backgroundColor="transperant"
                    options={{
                        legend: {
                            display: false
                         },
                         tooltips: {
                            enabled: true,
                            mode: 'label',
                            intersect: false,
                            fill: false,
                            displayColors: false,
                         },
                        maintaninAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default AbusiveConversationsChart;