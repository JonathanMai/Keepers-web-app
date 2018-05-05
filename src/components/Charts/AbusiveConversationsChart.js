import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { ResponsiveLine } from 'nivo';
import { connect } from 'react-redux';

class AbusiveConversationsChart extends Component {
    
    constructor(props) {
        super(props);
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
            data={[ {
                "id": "whisky",
                "color": "hsl(257, 70%, 50%)",
                "data": [
                  {
                    "color": "hsl(96, 70%, 50%)",
                    "x": "KZ",
                    "y": 20
                  },
                  {
                    "color": "hsl(93, 70%, 50%)",
                    "x": "LT",
                    "y": 7
                  },
                  {
                    "color": "hsl(77, 70%, 50%)",
                    "x": "AT",
                    "y": 27
                  },
                  {
                    "color": "hsl(184, 70%, 50%)",
                    "x": "NA",
                    "y": 37
                  },
                  {
                    "color": "hsl(140, 70%, 50%)",
                    "x": "HR",
                    "y": 24
                  },
                  {
                    "color": "hsl(158, 70%, 50%)",
                    "x": "IR",
                    "y": 44
                  },
                  {
                    "color": "hsl(296, 70%, 50%)",
                    "x": "IL",
                    "y": 37
                  },
                  {
                    "color": "hsl(145, 70%, 50%)",
                    "x": "VN",
                    "y": 42
                  },
                  {
                    "color": "hsl(14, 70%, 50%)",
                    "x": "DK",
                    "y": 49
                  }
                ]
              },
              {
                "id": "rhum",
                "color": "hsl(273, 70%, 50%)",
                "data": [
                  {
                    "color": "hsl(174, 70%, 50%)",
                    "x": "KZ",
                    "y": 5
                  },
                  {
                    "color": "hsl(218, 70%, 50%)",
                    "x": "LT",
                    "y": 28
                  },
                  {
                    "color": "hsl(318, 70%, 50%)",
                    "x": "AT",
                    "y": 8
                  },
                  {
                    "color": "hsl(97, 70%, 50%)",
                    "x": "NA",
                    "y": 36
                  },
                  {
                    "color": "hsl(170, 70%, 50%)",
                    "x": "HR",
                    "y": 21
                  },
                  {
                    "color": "hsl(102, 70%, 50%)",
                    "x": "IR",
                    "y": 6
                  },
                  {
                    "color": "hsl(22, 70%, 50%)",
                    "x": "IL",
                    "y": 60
                  },
                  {
                    "color": "hsl(355, 70%, 50%)",
                    "x": "VN",
                    "y": 1
                  },
                  {
                    "color": "hsl(77, 70%, 50%)",
                    "x": "DK",
                    "y": 30
                  }
                ]
              },
              {
                "id": "gin",
                "color": "hsl(33, 70%, 50%)",
                "data": [
                  {
                    "color": "hsl(243, 70%, 50%)",
                    "x": "KZ",
                    "y": 3
                  },
                  {
                    "color": "hsl(11, 70%, 50%)",
                    "x": "LT",
                    "y": 51
                  },
                  {
                    "color": "hsl(350, 70%, 50%)",
                    "x": "AT",
                    "y": 14
                  },
                  {
                    "color": "hsl(173, 70%, 50%)",
                    "x": "NA",
                    "y": 33
                  },
                  {
                    "color": "hsl(2, 70%, 50%)",
                    "x": "HR",
                    "y": 1
                  },
                  {
                    "color": "hsl(72, 70%, 50%)",
                    "x": "IR",
                    "y": 21
                  },
                  {
                    "color": "hsl(345, 70%, 50%)",
                    "x": "IL",
                    "y": 14
                  },
                  {
                    "color": "hsl(69, 70%, 50%)",
                    "x": "VN",
                    "y": 2
                  },
                  {
                    "color": "hsl(54, 70%, 50%)",
                    "x": "DK",
                    "y": 38
                  }
                ]
              },
              {
                "id": "vodka",
                "color": "hsl(43, 70%, 50%)",
                "data": [
                  {
                    "color": "hsl(350, 70%, 50%)",
                    "x": "KZ",
                    "y": 49
                  },
                  {
                    "color": "hsl(216, 70%, 50%)",
                    "x": "LT",
                    "y": 47
                  },
                  {
                    "color": "hsl(102, 70%, 50%)",
                    "x": "AT",
                    "y": 35
                  },
                  {
                    "color": "hsl(57, 70%, 50%)",
                    "x": "NA",
                    "y": 22
                  },
                  {
                    "color": "hsl(283, 70%, 50%)",
                    "x": "HR",
                    "y": 33
                  },
                  {
                    "color": "hsl(216, 70%, 50%)",
                    "x": "IR",
                    "y": 54
                  },
                  {
                    "color": "hsl(43, 70%, 50%)",
                    "x": "IL",
                    "y": 28
                  },
                  {
                    "color": "hsl(353, 70%, 50%)",
                    "x": "VN",
                    "y": 35
                  },
                  {
                    "color": "hsl(2, 70%, 50%)",
                    "x": "DK",
                    "y": 33
                  }
                ]
              },
              {
                "id": "cognac",
                "color": "hsl(141, 70%, 50%)",
                "data": [
                  {
                    "color": "hsl(355, 70%, 50%)",
                    "x": "KZ",
                    "y": 11
                  },
                  {
                    "color": "hsl(198, 70%, 50%)",
                    "x": "LT",
                    "y": 24
                  },
                  {
                    "color": "hsl(315, 70%, 50%)",
                    "x": "AT",
                    "y": 36
                  },
                  {
                    "color": "hsl(316, 70%, 50%)",
                    "x": "NA",
                    "y": 7
                  },
                  {
                    "color": "hsl(350, 70%, 50%)",
                    "x": "HR",
                    "y": 25
                  },
                  {
                    "color": "hsl(19, 70%, 50%)",
                    "x": "IR",
                    "y": 41
                  },
                  {
                    "color": "hsl(176, 70%, 50%)",
                    "x": "IL",
                    "y": 12
                  },
                  {
                    "color": "hsl(59, 70%, 50%)",
                    "x": "VN",
                    "y": 23
                  },
                  {
                    "color": "hsl(134, 70%, 50%)",
                    "x": "DK",
                    "y": 45
                  }
                ]
              }
            ]}
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