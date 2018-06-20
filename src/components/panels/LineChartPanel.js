import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import AbusiveConversationsChart from '../charts/AbusiveConversationsChart.js'
import { GetMessagesStatistics } from '../../serviceAPI';

/*
    Line chart panel get all the statistics information needed.
    Getting and parsing all the statistics data and sends it to abusive chart.
*/
export class LineChartPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}, // {"18-05-18" : {***}, "19-05-18": {***}}
            labels: [],
        }
        this.getData = this.getData.bind(this);
        this.getChildMessagesStatisticsByRange();
    }
    
    componentDidUpdate(){
        if(this.props.childIndex ===  this.props.currChild && this.props.update !== undefined && !this.props.update[0]){
            this.props.setUpdate(0);
            this.getChildMessagesStatisticsByRange();
        }
    }

    // gets the child statistics and sets data using it.
    getChildMessagesStatisticsByRange() {
        let day = moment(this.props.startDate); // creates a moment object from the first day.
        day.locale(this.props.lang.language)
        let range = this.props.isOneDay ? 24 : this.props.range; // holds range
        let addBy = this.props.isOneDay ? 'hours' : 'day'; // for one day 'hours'(shows hours), else 'day'(show days) 
        let tempDay =  moment(day);

        // all the information variables.
        let labels = new Array(range + 1); // labels of each x point.
        let countEasy = new Array(range+1); // count the words classified as easy
        let countMedium = new Array(range+1); // count the words classified as medium
        let countHarsh = new Array(range+1); // count the words classified as harsh
        let newData = this.state.data; // holds the new data we parse to.
        var flag = 0; // flag that indicates when all packets finished.

        // iterate through all days and check if there is already saved data for the date range - if not call for it.
        for(let i=0; i<=range;  i++, tempDay=moment(day).add(i,addBy)) {
            // when data already stored for the given date.
            if(!this.props.isOneDay && this.state.data !== undefined && newData[tempDay.format("YY-MM-DD")] !== undefined) {
                let format = tempDay.format("YY-MM-DD");
                labels[i] = moment(tempDay).format("MMM Do").toString(); // label for this point
                countEasy[i] = newData[format][0]; // easy count.
                countMedium[i] = newData[format][1];// medium count.
                countHarsh[i] = newData[format][2]; // heavy count.
                flag++;
                if(flag > range) {
                    this.insertNewData(newData, [countEasy, countMedium, countHarsh], labels);
                }
            }
            // if data wasnt called before - fetch data from server.
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
                    label += moment(tempDay).format("Ha").toString(); // hours for one day.
                }
                else {
                    label += moment(tempDay).format("MMM Do").toString(); // by day for all else.
                }
                labels[i] = label; 
                flag++;
                this.getData(this.props.childrens[this.props.childIndex].id, startTime, endTime, i, newData, countEasy, countMedium, countHarsh, this.props.isOneDay, flag, range, day, labels);
            };
        }
    }

    getData(id, startTime, endTime, i, newData, countEasy, countMedium, countHarsh, isOneDay, flag, range, day, labels) {
        GetMessagesStatistics(id, startTime, endTime).then(res => {  // When respond package is with status 200
            let result = res.data;
            countEasy[i] = parseInt(result.easyCount, 10); // easy count.
            countMedium[i] = parseInt(result.mediumCount, 10); // medium count.
            countHarsh[i] = parseInt(result.heavyCount, 10); // heavy count.
            if(!isOneDay) {
                newData[moment(day).add(i, 'day').format("YY-MM-DD")] = [countEasy[i], countMedium[i], countHarsh[i]];
            }
            if(flag > range) {
                this.insertNewData(newData, [countEasy, countMedium, countHarsh], labels);
            }
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    // insert new data to state.
    insertNewData(newData, useData, labels) {
        this.setState({
            ...this.state,
            data: newData,
            useData: useData,
            labels: labels
        });
    }

    render() {
        return (this.state.useData !== undefined && <AbusiveConversationsChart style={{height: 'inherit'}} data={this.state.useData} labels={this.state.labels} />);
    }
}

// redux variables
const mapStateToProps = (state) => {
    return {
        childrens: state.DashboardInfo.childrens,       // gets information of all childrens of the user through redux.
        startDate: state.DashboardInfo.startDate,       // gets the start date the user looking for the information to start from throguh redux.
        range: state.DashboardInfo.datesRange,          // gets the range of the dates the user picked to see the data.
        isOneDay: state.DashboardInfo.isOneDay,         // gets the boolean to indicate if the data is for one day - for one day show statistics in hours, else show in days.
        update: state.DashboardInfo.updateData,         // gets the state of the component - if need to get the data.
        currChild: state.DashboardInfo.currTab,         // gets the current children tab user at.
        lang: state.DisplayLanguage.currLang            // use language from redux - here lets the texts the option to change all page languages.
    };
  };

// redux functions.
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