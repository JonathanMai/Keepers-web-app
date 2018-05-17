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
            dateLabels: [],
            tickValues: []
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

    //     getLabels() {
    //     let day = moment.utc(this.props.dates[0]); // Creates a moment object from the first day.
    //     let labels = [];
    //     let tickVals = [];
    //     if(this.props.range <= 1) {
    //         for(let i=0; i<=24; i++) {
    //             let format = 'HH:MM';
    //             if(i == 0 || i == 24)
    //                 format = 'MMM Do';
    //             labels.push(moment.utc(day).add(i,'hours').format(format).toString());
    //             if(i%3 === 0) {
    //                 tickVals.push(labels[i]);
    //             }
    //         }
    //     }
    //     else {
    //         for(let i=0; i<=this.props.range; i++) {
    //             labels.push(moment.utc(day).add(i,'days').format("MMM Do").toString());
    //             if(this.props.range > 7) {
    //                 if(i%3 === 0) {
    //                     tickVals.push(labels[i]);
    //                 }
    //             } 
    //             else {
    //                 tickVals.push(labels[i]);
    //             }
    //         }            
    //     }

    //     this.setState({
    //       ...this.state,
    //       dateLabels: labels,
    //       tickValues: tickVals
    //     });


    // }

    // Gets the child statistics and sets data using it.
    getChildMessagesStatistics(props) {
        // console.log(props.dates[0],props.dates[1],props.dates[0].isSame(props.dates[1]));
        let day = moment(props.startDate); // Creates a moment object from the first day.
        console.log(props);
        let newData = [];
        let range = props.isOneDay ? 24 : props.range;
        let addBy = props.isOneDay ? 'hours' : 'day';
        let tempDay =  moment(day);
        let tickVals = new Array((range > 7) ? range/5 | 0 : range);
        let countEasy = new Array(range);
        let countMedium = new Array(range);
        let countHard = new Array(range);
        let flag = 0;
        // console.log((range > 7 || range <= 1)? "YEAHH" : "NOOOOOOO");
        for(let i=0; i<=range;  i++, tempDay=moment(day).add(i,addBy)) {
            // datesLabel.push(moment(day).format("MMMM DD"));
            // day=moment(day).add(1,'days').format("MMMM D");
            // if(i ===2 | i === 3) {
            //     console.log(child, moment(tempDay).startOf('day').valueOf(),"and", moment(tempDay).endOf('day').valueOf())
            //     console.log(child, moment.utc(tempDay).startOf('day').valueOf(),"and", moment.utc(tempDay).add(1,'days').startOf('day').valueOf())
            // }
            let startTime;
            let endTime;
            if(props.isOneDay) {
                startTime = moment(tempDay);
                endTime = moment(tempDay).add(1, 'hours');
            } 
            else {
                startTime = moment(tempDay).startOf('day');
                endTime =  moment(tempDay).endOf('day');
            }
            // console.log(tempDay);
            let label =  "";
            if(props.isOneDay)
                if(i === 0 || i === range)
                    label += moment(tempDay).format("MMM Do Ha").toString();
                else
                    label += moment(tempDay).format("Ha").toString();
            else
                label += moment(tempDay).format("MMM Do").toString();
            
            if(range > 7 && (i%5 === 0 || i===range)) {
                // if(i === range && range%8 !== 0)
                    tickVals[i/5 | 0] = label;
            }
            else if(range <= 7)
                tickVals[i] = label;
            //  (range <= 1 && i !== ) ? moment(tempDay).add(i, 'hours').valueOf() :.valueOf();
            // (range <= 1) ? moment(tempDay).add(i+1, 'hours').valueOf() :.valueOf();
            GetMessagesStatistics(props.childId, startTime, endTime).then(res => {  // When respond package is with status 200
                let result = res.data;

                countEasy[i] = this.createStatisticObject(label, parseInt(result.easyCount)); // easy count.
                countMedium[i] = this.createStatisticObject(label, parseInt(result.mediumCount)); // medium count.
                countHard[i] = this.createStatisticObject(label, parseInt(result.heavyCount)); // heavy count.
                flag++;
                if(flag > range){
                    let tempData = [];
                    tempData.push(countEasy);
                    tempData.push(countMedium);
                    tempData.push(countHard);
                    // this.createStatisticsDataset(tempData);
                    this.setState({
                      ...this.state,
                      data: tempData,
                      tickValues: tickVals
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
        return (this.state.data !== undefined && <AbusiveConversationsChart data={this.state.data} tickValues={this.state.tickValues} />);
    }
}



function LineChartPanel(props) {
    // console.log(props);
    return <LineChart childId={props.childrens[props.childIndex].id} startDate={props.startDate} range={props.range} isOneDay={props.isOneDay} />
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        range: state.dashboardInfo.datesRange,
        isOneDay: state.dashboardInfo.isOneDay
    };
  };

export default connect(mapStateToProps)(LineChartPanel);