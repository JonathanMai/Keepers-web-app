import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { GetUsageStatistics } from '../../serviceAPI';
import UsageTimeChart from '../charts/UsageTimeChart';

class BarChart extends Component {

    
    constructor(props) {
        super(props);
        // console.log(this.props.data);
        
        this.state = {
            dataAssigned: false,
            labels: [],
            dataSet: [],
            timeType: 'm'
        }
        // var colors = {}
        this.getUsageStatistics(this.props);
        // this.buildChart = this.buildChart.bind(this);
    }

    componentWillReceiveProps(props) {
        this.getUsageStatistics(this.props);
    }

    // Gets the child usage data - how many hours he spent and in what.
    getUsageStatistics(props) {
        // let child = props.childId; // Gets the child id.
        GetUsageStatistics(props.childId).then(res => {  // When respond package is with status 200
            this.buildChartData(res.data);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error.data);
        });
    }

    // Creates the data.
    buildChartData(data) {
        let type = 'm';
        let tempData = [];
        // let keys = [];
        data.map((usageData) => {
            // console.log(usageData);
            let difference = moment(usageData.endTime).diff(moment(usageData.startTime), 'minutes');
            if(difference >= 60) type = 'h';
            let appName = usageData.appName;
            tempData.push({appName: appName, count: difference})
            // return;
            // labels.push(usageData.appName);
            // dataSet.push(differnece);
            // return;
            // newData.push({appName: appName, [appName]: difference});
        }) ;

        let dataSet = [];
        let labels = [];
        [].concat(tempData)
        .sort((a, b) => a.count === b.count ? a.appName > b.appName  : a.count < b.count)
        .map((item, i) => {
                labels.push(item.appName);
                dataSet.push(type === "m" ? item.count : item.count/60);
                // <div key={i}> {item.matchID} {item.timeM}{item.description}</div>
                // return({appName: item.appName, [item.appName]: item.count})}
                return;
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
        return (this.state.dataAssigned && <UsageTimeChart style={{height: 'inherit'}} labels={this.state.labels} data={this.state.dataSet} type={this.state.timeType}/>);
        // return (this.state.data !== undefined && <UsageTimeChart data={this.state.data} />);
    }
}

function BarChartPanel(props) {
    // console.log(props);
    return <BarChart style={{height: 'inherit'}} childId={props.childrens[props.childIndex].id} startDate={props.startDate} range={props.range} />
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        range: state.dashboardInfo.datesRange
    };
  };

export default connect(mapStateToProps)(BarChartPanel);
