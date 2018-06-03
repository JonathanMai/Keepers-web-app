import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import LineChartPanel from './LineChartPanel';
import { connect } from 'react-redux';
import MsgsPanel from './MsgsPanel';
import LineChartPanel from './LineChartPanel';
import BarChartPanel from './BarChartPanel';
import UsageTimeChart from '../charts/UsageTimeChart';
import "../../styles/topPanel.css";

// TODO: in top panel there supposed to be date state that will change the data for all sub components.
class TopPanel extends Component {
        //Gets all the labels.
    constructor(props) {
        super(props);
        // this.props.setDate([1524472883410, 1525166748869]);
    }
    render(){
        return(
            <Row style={{height: 44 + 'vh'}}>
                <Col xs={8} md={9} style={{padding: 0, height: 'inherit'}}>
                    <Row style={{height: '40%'}}> 
                        {this.props.range !== undefined && <LineChartPanel childIndex={this.props.childIndex} />}
                    </Row>
                    <Row style={{height: '10%'}}>
                    <div>
                        <span className="date_title"><span className="clock_icon">&#128340;</span>	 Usage Time</span>
                        <hr className="line_hr"/>
                    </div>
                    </Row>
                    <Row style={{height: '50%'}}>
                        {this.props.range !== undefined && <BarChartPanel childIndex={this.props.childIndex} />}
                    </Row>
                </Col>
                <Col xs={4} md={3} lg={3} style={{'paddingRight': 0 + 'px', height: 'inherit'}}> 
                    {this.props.range !== undefined && <MsgsPanel childIndex={this.props.childIndex} />}
                </Col>
            </Row>);
    }
}

const mapStateToProps = (state) => {
    return {
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
};

export default connect(mapStateToProps)(TopPanel);