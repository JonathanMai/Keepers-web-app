import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetUsageStatistics } from '../../serviceAPI';
import UsageTimeChart from '../charts/UsageTimeChart';

/*
    Bar chart panel get all the usage information needed.
    Getting and parsing all the usage data and sends it to usage time chart.
*/
class BarChartPanel extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            dataAssigned: false,    // holds a boolean that indicate if the new data was assigned.
            labels: [],             // bar labels - used in the bar chart.
            dataSet: [],            // the data that we show on chart. 
            timeType: 'm'           // type of the data(in minutes or hours)
        }
    }

    componentDidMount() {
        this.getUsageStatistics(this.props);
    }

    componentDidUpdate() {
        if(this.props.childIndex === this.props.currChild && this.props.update !== undefined && !this.props.update[1]){
            this.props.setUpdate(1);
            this.getUsageStatistics();
        }
    }

     // gets the child usage data - how many hours he spent and in what.
    getUsageStatistics() {
        GetUsageStatistics(this.props.childrens[this.props.childIndex].id).then(res => {  // when respond package is with status 200
            this.buildChartData(res.data);// parse data
        }).catch(error => { // when respond package is with error status - 400 ...
            console.log(error);
        });
    }

    // parsing the data we recieved from keepers server.
    // gets the data and put the parsed data to state data set.
    buildChartData(data) {
        let type = 'm'; // default show type - in minutes.
        let apps = [];
        data.map((usageData) => {
            let difference = moment(usageData.endTime).diff(moment(usageData.startTime), 'minutes');
            if(difference >= 60) type = 'h'; // change type when there is an app with more then 60 minutes use.
            let appName = usageData.appName;
            if(apps[appName] === undefined) { // checks if app name already has a data set.
                apps[appName] = 0
            }
            apps[appName] += difference;
            return null;
        }) ;

        // arrange the data and app name in object.
        let tempData = Object.keys(apps).map((appName) => {
            let difference = apps[appName];
            return {appName: appName, count: difference};
        });

        let dataSet = [];
        
        // sorts the data by size and name.
        let labels = [].concat(tempData)
        .sort((a, b) => a.count === b.count ? a.appName > b.appName  : a.count < b.count)
        .map((item, i) => {
            dataSet.push(type === "m" ? item.count : item.count/60);
            return item.appName;

        });
        this.setState({
            ...this.state,
            labels: labels,
            dataSet: dataSet,
            timeType: type,
            dataAssigned: true
        });
    }

    render() {
        return (this.state.dataAssigned && <UsageTimeChart style={{height: 'inherit'}} labels={this.state.labels} data={this.state.dataSet} type={this.state.timeType}/>); // shows the usage chart when there is data assigned.
    }
}

// redux variables.
const mapStateToProps = (state) => {
    return {
        childrens: state.DashboardInfo.childrens,    // gets information of all childrens of the user through redux.
        startDate: state.DashboardInfo.startDate,    // gets the start date the user looking for the information to start from throguh redux.
        range: state.DashboardInfo.datesRange,       // gets the range of the dates the user picked to see the data.
        update: state.DashboardInfo.updateData,      // gets the state of the component - if need to get the data.
        currChild: state.DashboardInfo.currTab       // gets the current children tab user at.
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

export default connect(mapStateToProps, mapDispatchToProps)(BarChartPanel);

