// import React, { Component } from 'react';
// import { ResponsiveLine, Line } from 'nivo';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import { GetMessagesStatistics } from '../../serviceAPI';

// class AbusiveConversationsChart extends Component {
    
//     constructor(props) {
//         super(props);
//         // console.log(this.props.data);

//         this.state = {
//             dateLabels: [],
//             colors: ["rgb(255,0,0)", "rgb(255,128,0)", "rgb(255,255,0)"]
//         }
//         this.getChildMessagesStatistics();
//         this.buildChart = this.buildChart.bind(this);
//     }

//     componentWillMount() {
//       // this.getLabels();
//     }

//     getLabels() {
//       let day = moment.utc(this.props.dates[0]); // Creates a moment object from the first day.
//       let labels = [];
//       for(let i=0; i<=this.props.range; i++){
//           labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
//         }
//         this.setState({
//           ...this.state,
//           dateLabels: labels
//         });
//         console.log(labels);
//     }

//     updateChart () {
//         this.chartData.update();
//     }

//     //     // Gets the child statistics and sets data using it.
//     getChildMessagesStatistics() {
//       let day = moment(this.props.dates[0]); // Creates a moment object from the first day.
//       // let lastDay = moment.utc(this.state.date[1]);
//       // var stillUtc = moment.utc(lastDay).toDate();
//       // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
//       let newData = [];
      
//       let daysRange = this.props.range;
//       // console.log(moment.utc(this.state.date[0]).startOf('day').valueOf(),"and", moment(this.state.date[0]).startOf('day').valueOf());

      
//       // for(let i=0; i<this.state.childrens.length;  i++) {
//         // console.log(i); 
//         let tempDay = moment(day);
//         let countEasy = new Array(daysRange);
//         let countMedium = new Array(daysRange);
//         let countHard = new Array(daysRange);
//         let flag = 0;
//         let child = this.props.childrens[this.props.childIndex].id; // Gets the child id.
//         for(let i=0; i<=daysRange;  i++, tempDay=moment(day).add(i,'days')) {
//             // datesLabel.push(moment(day).format("MMMM DD"));
//             // day=moment(day).add(1,'days').format("MMMM D");
//             // if(i ===2 | i === 3) {
//             //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
//             //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
//             // }
//             GetMessagesStatistics(child, moment(tempDay).startOf('day').valueOf(), moment(tempDay).endOf('day').valueOf()).then(res => {  // When respond package is with status 200
//                 let result = res.data;
//                 let label =  moment(day).add(i,'days').format("MMM Do").toString();
//                 countEasy[i] = this.createStatisticObject(label, parseInt(result.easyCount)); // easy count.
//                 countMedium[i] = this.createStatisticObject(label, parseInt(result.mediumCount)); // medium count.
//                 countHard[i] = this.createStatisticObject(label, parseInt(result.heavyCount)); // heavy count.
//                 flag++;
//                 if(flag > daysRange){
//                     let tempData = [];
//                     tempData.push(countEasy);
//                     tempData.push(countMedium);
//                     tempData.push(countHard);
//                     // this.createStatisticsDataset(tempData);
//                     this.setState({
//                       ...this.state,
//                       chartData: tempData
//                   });
//                   console.log(this.state.chartData);
//                     // if(this.state.draw[0] == false){
//                     //     let tempDraw = this.state.draw;
//                     //     tempDraw[0] = true;
//                     //     this.setState({
//                     //         ...this.state,
//                     //         draw: tempDraw
//                     //     });
//                     //     console.log(this.state.draw);
//                     // }
//                 }
//             }).catch(error => { // When respond package is with error status - 400 ...
//                 console.log(error.data);
//             });
//         };
//         // }
//     }

//     createStatisticObject(date, data) {
//       return ({
//         "x": date,
//         "y": data
//       });
//     }

//     createStatisticsDataset(data){
//         let newData = {
//             labels: this.state.dateLabels,
//             datasets:[
//                 // Level 1 words - lowest words
//                 {
//                     label:['level 1'],
//                     data: data[0],
//                     borderColor: 'rgba(255, 230, 100, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 },
//                 // Level 2 words - medium words
//                 {
//                     label:['level 2'],
//                     data: data[1],
//                     borderColor: 'rgba(255, 128, 0, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 },
//                 // Level 3 words - worst words
//                 {                 
//                     label:['level 3'],
//                     data: data[2],
//                     borderColor: 'rgba(255, 0, 0, 1)',
//                     pointRadius: 2,
//                     fill: false
//                 }
//             ],
//         };
//         // let childrensData = this.state.chartData;
//         // childrensData[index] = Object.assign({abusiveChartData: newData}, this.state.childrensData[index]);
//         // let dataSet = this.state.dataSet;


//         // dataSet[this.state.tab] = true;
//         // console.log(this.state.childrens.messagesHeads);
//         // let oldData = this.state.abusiveChartData;

//         // this.setState({
//         //     ...this.state,
//         //     abusiveChartData: oldData
//         // });
//     }
    
//     // fillData() {
//     //     var date = [1514757600000, 1519875891875];

//     //     // Calculate the difference in milliseconds
//     //     var difference_ms = date2_ms - date1_ms;
//     //     //take out milliseconds
//     //     difference_ms = difference_ms/1000;
//     //     var seconds = Math.floor(difference_ms % 60);
//     //     difference_ms = difference_ms/60; 
//     //     var minutes = Math.floor(difference_ms % 60);
//     //     difference_ms = difference_ms/60; 
//     //     var hours = Math.floor(difference_ms % 24);  
//     //     var days = Math.floor(difference_ms/24);

//     //     var actualDateStart = new Date(1514757600000);
//     //     var labels;
//     //     var data1;
//     //     var data2;
//     //     var data3;        

//     //     for(i=0; i<days; i++){
//     //     }
//     //     this.setState({
//     //         labels = []
//     //     })
//     // }
//     buildChart() {
//       let line = <Line height={400} width={600}
//       data={[
//         {
//           "id": "heavy",
//           "data": this.state.chartData[2]
//         },
//         {
//           "id": "medium",
//           "data": this.state.chartData[1]
//         },
//         {
//           "id": "easy",
//           "data": this.state.chartData[0]
//         }
//       ]}
//       colors={this.state.colors}
//       margin={{
//           "top": 50,
//           "right": 110,
//           "bottom": 50,
//           "left": 60
//       }}
//       minY="0"
//       curve="monotoneX"
//       axisBottom={{
//           "orient": "bottom",
//           "tickSize": 0,
//           "tickPadding": 8,
//           "tickRotation": 0,

//       }}
//       axisLeft={{
//           "orient": "left",
//           "tickSize": 0,
//           "tickPadding": 8,
//           "tickRotation": 0,
//       }}
//       dotSize={10}
//       dotColor="inherit:darker(0.3)"
//       dotBorderWidth={2}
//       dotBorderColor="#ffffff"
//       enableDotLabel={true}
//       dotLabel="y"
//       dotLabelYOffset={-12}
//       animate={true}
//       motionStiffness={90}
//       motionDamping={15}
//       legends={[
//           {
//               "anchor": "bottom-right",
//               "direction": "column",
//               "translateX": 100,
//               "itemWidth": 80,
//               "itemHeight": 20,
//               "symbolSize": 12,
//               "symbolShape": "circle"
//           }
//       ]}
//   />
//       return line;
//     }

//     render() {
//         // for(let i = 0; i < this.props.labels.length; i++){
//         //     console.log(this.props.labels[i]);
//         // }
//         return (
//             this.state.chartData !== undefined && this.buildChart());
//         // return <div>top panel</div>
//     }
// }

// const mapStateToProps = (state) => {
//   return {
//       childrens: state.dashboardInfo.childrens,
//       dates: state.dashboardInfo.dates,
//       range: state.dashboardInfo.datesRange
//   };
// };

// export default connect(mapStateToProps)(AbusiveConversationsChart);

import React, { Component } from 'react';
import { ResponsiveLine, Line } from 'nivo';

var AbusiveConversationsChart = (props) => {
  console.log(props);
  let line = 
    <Line height={400} width={600}
    data={[
        {
          "id": "easy",
          "data": props.data[0]
        },
        {
          "id": "medium",
          "data": props.data[1]
        },
        {
          "id": "heavy",
          "data": props.data[2]
        }
      ]}
      colors={["rgb(255,255,0)", "rgb(255,128,0)", "rgb(255,0,0)"]}
      margin={{
          "top": 50,
          "right": 110,
          "bottom": 50,
          "left": 60
      }}
      minY="0"
      curve="monotoneX"
      axisBottom={{
          "orient": "bottom",
          "tickSize": 0,
          "tickPadding": 8,
          "tickRotation": 0,

      }}
      axisLeft={{
          "orient": "left",
          "tickSize": 0,
          "tickPadding": 8,
          "tickRotation": 0,
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
  return line;
}

export default AbusiveConversationsChart;