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
            // console.log(usageData);
            let difference = moment.utc(usageData.endTime).diff(moment.utc(usageData.startTime), 'minutes');
            let appName = usageData.appName;
            tempData.push({appName: appName, count: difference})
            return;
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
        this.setState({
            ...this.state,
            data: newData,
            keys: keys,
            dataAssigned: true
        });
    }

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