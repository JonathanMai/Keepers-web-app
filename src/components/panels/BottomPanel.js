import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import MyMap from '../MyMap';
import "../../styles/topPanel.css";
import "../../styles/box.css";



class BottomPanel extends Component {
    render(){
        return(
            <Row className="border" style={{height: 38 + 'vh', padding: 7, marginTop: 8}}>
                <Col xs={8} style={{padding: 0}}>
                    <MyMap />
                </Col>   
                <Col xs={4} style={{ padding: 0}}>
                    <div className="border" style={{height: '-webkit-fill-available'}}></div>
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