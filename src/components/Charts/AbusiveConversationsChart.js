import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { ResponsiveLine } from 'nivo';
import { connect } from 'react-redux';

class AbusiveConversationsChart extends Component {
    
    constructor(props) {
        super(props);
        console.log("INSIDE ABUSIVe");
        console.log(this.props.data);

        this.state = {
            chartData: this.props.abusiveChartData
        }
    }

    updateChart () {
        this.chartData.update();
    }
    
    // fillData() {
    //     var date = [1514757600000, 1519875891875];

    //     // Calculate the difference in milliseconds
    //     var difference_ms = date2_ms - date1_ms;
    //     //take out milliseconds
    //     difference_ms = difference_ms/1000;
    //     var seconds = Math.floor(difference_ms % 60);
    //     difference_ms = difference_ms/60; 
    //     var minutes = Math.floor(difference_ms % 60);
    //     difference_ms = difference_ms/60; 
    //     var hours = Math.floor(difference_ms % 24);  
    //     var days = Math.floor(difference_ms/24);

    //     var actualDateStart = new Date(1514757600000);
    //     var labels;
    //     var data1;
    //     var data2;
    //     var data3;        

    //     for(i=0; i<days; i++){
    //     }
    //     this.setState({
    //         labels = []
    //     })
    // }

    render() {
        // for(let i = 0; i < this.props.labels.length; i++){
        //     console.log(this.props.labels[i]);
        // }
        return ( 
        <ResponsiveLine
            data={[]}
            margin={{
                "top": 50,
                "right": 110,
                "bottom": 50,
                "left": 60
            }}
            minY="auto"
            stacked={true}
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "country code",
                "legendOffset": 36,
                "legendPosition": "center"
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "count",
                "legendOffset": -40,
                "legendPosition": "center"
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
        );
    }
}

export default AbusiveConversationsChart;