import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import MsgsPanel from './MsgsPanel';
import LineChartPanel from './LineChartPanel';
import BarChartPanel from './BarChartPanel';
/*
    Top panel component, inside this component we has line chart panel,
    bar chart panel and messages panel. As you can see they all get renders 
    inside this component and will shown in one screen.
*/
class TopPanel extends Component {
    render(){
        return(
            <Row style={{height: 54 + 'vh'}}>
                {/* Line chart panel and bar chart panel has their column */}
                <Col xs={8} md={9} style={{padding: 0, height: 'inherit'}}>
                    {/* Row for line chart panel */}
                    <Row style={{height: '46%'}}> 
                        {this.props.range !== undefined && <LineChartPanel childIndex={this.props.childIndex} />}
                    </Row>
                    {/* Row for style between two chart panels */}
                    <Row style={{height: '10%'}}>
                    <div>
                        <span className="date_title"><span className="clock_icon">&#128340;</span>{" " + this.props.currLang.usage_time}</span>
                        <hr className="line_hr"/>
                    </div>
                    </Row>
                    {/* Row for bar chart panel */}
                    <Row style={{height: '45%'}}>
                        {this.props.range !== undefined && <BarChartPanel childIndex={this.props.childIndex} />}
                    </Row>
                </Col>
                {/* Messages panel in new column */}
                <Col xs={4} md={3} lg={3} style={{'paddingRight': 0 + 'px', height: 'inherit'}}> 
                    {this.props.range !== undefined && <MsgsPanel childIndex={this.props.childIndex} />}
                </Col>
            </Row>);
    }
}

// variable of redux
const mapStateToProps = (state) => {
    return {
        range: state.dashboardInfo.datesRange,  // the range of dates between startDate and endDate
        currLang: state.lang.currLang           // current language of the application
    };
};

export default connect(mapStateToProps)(TopPanel);