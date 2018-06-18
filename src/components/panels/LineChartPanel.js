import React, { Component } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import AbusiveConversationsChart from '../charts/AbusiveConversationsChart.js'
import { GetMessagesStatistics } from '../../serviceAPI';

export class LineChartPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}, // {"18-05-18" : {***}, "19-05-18": {***}}
            labels: [],
        }
        this.getChildMessagesStatisticsByRange();
    }
    
    componentDidUpdate(){
        if(this.props.childIndex ===  this.props.currChild && this.props.update != undefined && !this.props.update[0]){
            this.props.setUpdate(0);
            this.getChildMessagesStatisticsByRange();
        }
    }

    render() {
        return (this.state.useData !== undefined && <AbusiveConversationsChart style={{height: 'inherit'}} data={this.state.useData} labels={this.state.labels} />);
    }

    // Gets the child statistics and sets data using it.
    getChildMessagesStatisticsByRange(childIndex) {
        let day = moment(this.props.startDate); // Creates a moment object from the first day.
        let range = this.props.isOneDay ? 24 : this.props.range;
        let addBy = this.props.isOneDay ? 'hours' : 'day';
        let tempDay =  moment(day);
        let labels = new Array(range + 1);
        let tickVals = new Array((range > 7) ? range/5 | 0 : range);
        let countEasy = new Array(range+1);
        let countMedium = new Array(range+1);
        let countHard = new Array(range+1);
        let newData = this.state.data;
        let flag = 0;
        for(let i=0; i<=range;  i++, tempDay=moment(day).add(i,addBy)) {
            if(!this.props.isOneDay && this.state.data !== undefined && newData[tempDay.format("YY-MM-DD")] !== undefined) {
                let format = tempDay.format("YY-MM-DD");
                this.insertTickVal(tickVals, newData[format][0]["x"], range, i);
                labels[i] = moment(tempDay).format("MMM Do").toString();
                countEasy[i] = newData[format][0]; // easy count.
                countMedium[i] = newData[format][1];// medium count.
                countHard[i] = newData[format][2]; // heavy count.
                flag++;
                if(flag > range) {
                    this.insertNewData(newData, [countEasy, countMedium, countHard], labels);
                }
            }
            // If data wasnt called before - fetch data from server.
            else {
                let startTime;
                let endTime;
                if(this.props.isOneDay) {
                    startTime = moment(tempDay);
                    endTime = moment(tempDay).add(1, 'hours');
                } 
                else {
                    startTime = moment(tempDay).startOf('day');
                    endTime =  moment(tempDay).endOf('day');
                }
                let label =  "";
                if(this.props.isOneDay) {
                    label += moment(tempDay).format("Ha").toString();
                }
                else {
                    label += moment(tempDay).format("MMM Do").toString();
                }
                labels[i] = label; 
                this.insertTickVal(tickVals, label, range, i);
                GetMessagesStatistics(this.props.childrens[this.props.childIndex].id, startTime, endTime).then(res => {  // When respond package is with status 200
                    let result = res.data;
                    countEasy[i] = parseInt(result.easyCount); // easy count.
                    countMedium[i] = parseInt(result.mediumCount); // medium count.
                    countHard[i] = parseInt(result.heavyCount); // heavy count.
                        if(!this.props.isOneDay)
                        newData[moment(day).add(i, 'day').format("YY-MM-DD")] = [countEasy[i], countMedium[i], countHard[i]];
                    flag++;
                    if(flag > range)
                        this.insertNewData(newData, [countEasy, countMedium, countHard], labels);
                }).catch(error => { // When respond package is with error status - 400 ...
                    console.log(error);
                });
            };
        }
    }

    insertNewData(newData, useData, labels) {
        this.setState({
            ...this.state,
            data: newData,
            useData: useData,
            labels: labels
        });
    }

    insertTickVal(tickVals, label, range, index) {
        if(range > 7 && (index%5 === 0 || index === range)) {
            tickVals[index/5 | 0] = label;
        }
        else if(range <= 7)
            tickVals[index] = label;
    }
    getMessagesStatisticsByRange(){}

    createStatisticObject(date, count) { // date: {label: "", data: [[],[],[]]}
        return ({
            "label": date,
            "data": count
        });
    }
}



// function LineChartPanel(props) {
//     // console.log(props);
//     return <LineChart style={{height: 'inherit'}} child={props.childrens[props.childIndex]} startDate={props.startDate} range={props.range} isOneDay={props.isOneDay} lang={props.lang}/>
// }

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        range: state.dashboardInfo.datesRange,
        isOneDay: state.dashboardInfo.isOneDay,
        lang: state.lang.currLang,
        update: state.dashboardInfo.updateData,
        currChild: state.dashboardInfo.currTab
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        setUpdate: (val) => {
            dispatch({
                type: "SET_UPDATE",
                value: val
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LineChartPanel);