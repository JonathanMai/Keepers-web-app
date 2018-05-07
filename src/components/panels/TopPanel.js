import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import LineChartPanel from './LineChartPanel';
import { connect } from 'react-redux';
import MsgsPanel from './MsgsPanel';
import LineChartPanel from './LineChartPanel';

// TODO: in top panel there supposed to be date state that will change the data for all sub components.
class TopPanel extends Component {
        //Gets all the labels.
    constructor(props) {
        super(props);
        this.props.setDate([1524472883410, 1525166748869]);
        console.log(this.props.range)
    }
    render(){
        return <div>
            <Row>
                <Col xs={8}> 
                    {this.props.range !== undefined && <LineChartPanel childIndex={this.props.childIndex} />}
                </Col>
                <Col xs={4}> 
                    {this.props.range !== undefined && <MsgsPanel childIndex={this.props.childIndex} />}
                </Col>
            </Row>
            </div>
    }
}

const mapStateToProps = (state) => {
    return {
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDate: (val) => {
            dispatch({
                type: "SET_DATES",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);