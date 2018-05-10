import React, { Component } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetUsageStatistics } from '../../serviceAPI';
import UsageTimeChart from '../charts/UsageTimeChart';

class BarChartPanel extends Component {

    
    constructor(props) {
        super(props);
        // console.log(this.props.data);
        
        this.state = {
            dataAssigned: false,
            data: [],
            keys: []
        }
        // var colors = {}
        this.getUsageStatistics();
        // this.buildChart = this.buildChart.bind(this);
    }

    getUsageStatistics() {
        let child = this.props.childrens[this.props.childIndex].id; // Gets the child id.
        GetUsageStatistics(child).then(res => {  // When respond package is with status 200
            this.buildChartData(res.data);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.data);
        });
    }

    // Creates the data.
    buildChartData(data) {
        let tempData = [];
        let keys = [];
        data.map((usageData) => {
            console.log(usageData);
            let difference = moment.utc(usageData.endTime).diff(moment.utc(usageData.startTime), 'minutes');
            let appName = usageData.appName;
            tempData.push({appName: appName, count: difference})
            // newData.push({appName: appName, [appName]: difference});
        }) ;
        // let newData = [];
        const newData = [].concat(tempData)
        .sort((a, b) => a.count === b.count ? a.appName > b.appName  : a.count < b.count)
        .map((item, i) => {
                keys.push(item.appName);
                // <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
                return({appName: item.appName, [item.appName]: item.count})}
            );
            console.log(keys)
        this.setState({
            ...this.state,
            data: newData,
            keys: keys,
            dataAssigned: true
        });
    }
    // componentWillMount() {
    //   // this.getLabels();
    // }

    // getLabels() {
    //   let day = moment.utc(this.props.dates[0]); // Creates a moment object from the first day.
    //   let labels = [];
    //   for(let i=0; i<=this.props.range; i++){
    //       labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
    //     }
    //     this.setState({
    //       ...this.state,
    //       dateLabels: labels
    //     });
    //     console.log(labels);
    // }

    // updateChart () {
    //     this.chartData.update();
    // }

    //     // Gets the child statistics and sets data using it.
    // getChildMessagesStatistics() {
    //   let day = moment(this.props.dates[0]); // Creates a moment object from the first day.
    //   // let lastDay = moment.utc(this.state.date[1]);
    //   // var stillUtc = moment.utc(lastDay).toDate();
    //   // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    //   let newData = [];
      
    //   let daysRange = this.props.range;
    //   // console.log(moment.utc(this.state.date[0]).startOf('day').valueOf(),"and", moment(this.state.date[0]).startOf('day').valueOf());

      
    //   // for(let i=0; i<this.state.childrens.length;  i++) {
    //     // console.log(i); 
    //     let tempDay = moment(day);
    //     let countEasy = new Array(daysRange);
    //     let countMedium = new Array(daysRange);
    //     let countHard = new Array(daysRange);
    //     let flag = 0;
    //     let child = this.props.childrens[this.props.childIndex].id; // Gets the child id.
    //     for(let i=0; i<=daysRange;  i++, tempDay=moment(day).add(i,'days')) {
    //         // datesLabel.push(moment(day).format("MMMM DD"));
    //         // day=moment(day).add(1,'days').format("MMMM D");
    //         // if(i ===2 | i === 3) {
    //         //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
    //         //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
    //         // }
    //         GetMessagesStatistics(child, moment(tempDay).startOf('day').valueOf(), moment(tempDay).endOf('day').valueOf()).then(res => {  // When respond package is with status 200
    //             let result = res.data;
    //             let label =  moment(day).add(i,'days').format("MMM Do").toString();
    //             countEasy[i] = this.createStatisticObject(label, parseInt(result.easyCount)); // easy count.
    //             countMedium[i] = this.createStatisticObject(label, parseInt(result.mediumCount)); // medium count.
    //             countHard[i] = this.createStatisticObject(label, parseInt(result.heavyCount)); // heavy count.
    //             flag++;
    //             if(flag > daysRange){
    //                 let tempData = [];
    //                 tempData.push(countEasy);
    //                 tempData.push(countMedium);
    //                 tempData.push(countHard);
    //                 // this.createStatisticsDataset(tempData);
    //                 this.setState({
    //                   ...this.state,
    //                   data: tempData
    //               });
    //               console.log(this.state.chartData);
    //                 // if(this.state.draw[0] == false){
    //                 //     let tempDraw = this.state.draw;
    //                 //     tempDraw[0] = true;
    //                 //     this.setState({
    //                 //         ...this.state,
    //                 //         draw: tempDraw
    //                 //     });
    //                 //     console.log(this.state.draw);
    //                 // }
    //             }
    //         }).catch(error => { // When respond package is with error status - 400 ...
    //             console.log(error.data);
    //         });
    //     };
    //     // }
    // }

    // createStatisticObject(date, data) {
    //   return ({
    //     "x": date,
    //     "y": data
    //   });
    // }

    render() {
        return (this.state.dataAssigned && <UsageTimeChart data={this.state.data} keys={this.state.keys}/>);
        // return (this.state.data !== undefined && <UsageTimeChart data={this.state.data} />);
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
  };
  
  export default connect(mapStateToProps)(BarChartPanel);