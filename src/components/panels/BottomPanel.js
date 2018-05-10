import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import MyMap from '../MyMap';
import "../../styles/topPanel.css";


class BottomPanel extends Component {
    render(){
        return(
            <Row>
                <Col xs={8} style={{height: 45 + 'vh'}}>
                    <MyMap />
                </Col>   
                <Col xs={4}>
                    <div className="border"></div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens
    };
};

export default connect(mapStateToProps)(BottomPanel);