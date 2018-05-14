import React, { Component } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';
import AbusiveConversationsChart from '../charts/AbusiveConversationsChart'
import { GetMessagesStatistics } from '../../serviceAPI';

export class LineChart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dateLabels: []
        }
        // this.buildChart = this.buildChart.bind(this);
        this.getChildMessagesStatistics(this.props);
    }
    
    componentWillReceiveProps(props){
        // console.log()
        this.getChildMessagesStatistics(props);
        
    }
    componentDidCatch() {
        // this.getLabels();
    //   this.getChildMessagesStatistics();
    }

    getLabels() {
      let day = moment.utc(this.props.dates[0]); // Creates a moment object from the first day.
      let labels = [];
      for(let i=0; i<=this.props.range; i++){
          labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
        }
        this.setState({
          ...this.state,
          dateLabels: labels
        });
    }

    updateChart () {
        this.chartData.update();
    }

    //     // Gets the child statistics and sets data using it.
    getChildMessagesStatistics(props) {
      let day = moment(props.dates[0]); // Creates a moment object from the first day.
      // let lastDay = moment.utc(this.state.date[1]);
      // var stillUtc = moment.utc(lastDay).toDate();
      // var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
      let newData = [];
      
      let daysRange = props.range;
      // console.log(moment.utc(this.state.date[0]).startOf('day').valueOf(),"and", moment(this.state.date[0]).startOf('day').valueOf());

      
      // for(let i=0; i<this.state.childrens.length;  i++) {
        // console.log(i); 
        let tempDay = moment(day);
        let countEasy = new Array(daysRange);
        let countMedium = new Array(daysRange);
        let countHard = new Array(daysRange);
        let flag = 0;
        // let child = props.children.id; // Gets the child id.
        for(let i=0; i<=daysRange;  i++, tempDay=moment(day).add(i,'days')) {
            // datesLabel.push(moment(day).format("MMMM DD"));
            // day=moment(day).add(1,'days').format("MMMM D");
            // if(i ===2 | i === 3) {
            //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
            //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
            // }
            GetMessagesStatistics(props.childId, moment(tempDay).startOf('day').valueOf(), moment(tempDay).endOf('day').valueOf()).then(res => {  // When respond package is with status 200
                let result = res.data;
                let label =  moment(day).add(i,'days').format("MMM Do").toString();
                countEasy[i] = this.createStatisticObject(label, parseInt(result.easyCount)); // easy count.
                countMedium[i] = this.createStatisticObject(label, parseInt(result.mediumCount)); // medium count.
                countHard[i] = this.createStatisticObject(label, parseInt(result.heavyCount)); // heavy count.
                flag++;
                if(flag > daysRange){
                    let tempData = [];
                    tempData.push(countEasy);
                    tempData.push(countMedium);
                    tempData.push(countHard);
                    // this.createStatisticsDataset(tempData);
                    this.setState({
                      ...this.state,
                      data: tempData
                  });
                    // if(this.state.draw[0] == false){
                    //     let tempDraw = this.state.draw;
                    //     tempDraw[0] = true;
                    //     this.setState({
                    //         ...this.state,
                    //         draw: tempDraw
                    //     });
                    //     console.log(this.state.draw);
                    // }
                }
            }).catch(error => { // When respond package is with error status - 400 ...
                console.log(error.data);
            });
        };
        // }
    }

    createStatisticObject(date, data) {
      return ({
        "x": date,
        "y": data
      });
    }

    render() {
        // this.getChildMessagesStatistics();
        return (this.state.data !== undefined && <AbusiveConversationsChart data={this.state.data} />);
    }
}



function LineChartPanel(props) {
    // console.log(props);
    return <LineChart childId={props.childrens[props.childIndex].id} dates={props.dates} range={props.range} />
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
  };

export default connect(mapStateToProps)(LineChartPanel);