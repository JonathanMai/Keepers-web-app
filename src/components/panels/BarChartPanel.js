import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetUsageStatistics } from '../../serviceAPI';
import UsageTimeChart from '../charts/UsageTimeChart';

class BarChartPanel extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            dataAssigned: false,
            labels: [],
            dataSet: [],
            timeType: 'm'
        }
        this.getUsageStatistics(this.props);
    }

    componentWillReceiveProps(props) {
        this.getUsageStatistics(props);
    }

    render() {
        return (this.state.dataAssigned && <UsageTimeChart style={{height: 'inherit'}} labels={this.state.labels} data={this.state.dataSet} type={this.state.timeType}/>);
    }

    // Gets the child usage data - how many hours he spent and in what.
    getUsageStatistics(props) {
        // let child = props.childId; // Gets the child id.
        GetUsageStatistics(props.childId).then(res => {  // When respond package is with status 200
            this.buildChartData(res.data);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    // Creates the data.
    buildChartData(data) {
        let type = 'm';
        let apps = []
        data.map((usageData) => {
            let difference = moment(usageData.endTime).diff(moment(usageData.startTime), 'minutes');
            if(difference >= 60) type = 'h';
            let appName = usageData.appName;
            if(apps[appName] === undefined) {
                apps[appName] = 0
            }
            apps[appName] += difference;
        }) ;

        let tempData = [];
        Object.keys(apps).map((appName) => {
            console.log(apps[appName])
            let difference = apps[appName];
            tempData.push({appName: appName, count: difference});
        });        
        let dataSet = [];
        let labels = [];
        [].concat(tempData)
        .sort((a, b) => a.count === b.count ? a.appName > b.appName  : a.count < b.count)
        .map((item, i) => {
            console.log(item)
                labels.push(item.appName);
                dataSet.push(type === "m" ? item.count : item.count/60);
        });
        this.setState({
            ...this.state,
            labels: labels,
            dataSet: dataSet,
            timeType: type,
            dataAssigned: true
        });
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        range: state.dashboardInfo.datesRange
    };
  };

export default connect(mapStateToProps)(BarChartPanel);
