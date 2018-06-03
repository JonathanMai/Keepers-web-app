import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import MyMap from '../MyMap';
import "../../styles/topPanel.css";
import "../../styles/box.css";

class BottomPanel extends Component {

    render(){
        console.log(this.props);
        return(
            <div className="card" style={{height: 36 + 'vh', padding: 15, marginTop: 10}}>
                <Col xs={8} style={{padding: 0, height: '-webkit-fill-available'}}>
                    <MyMap />
                </Col>   
                <Col xs={4} style={{ padding: 0, height: '-webkit-fill-available'}}>
                    <div className="border" style={{height: '-webkit-fill-available'}}></div>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        currKid: state.dashboardInfo.currTab
    };
};

export default connect(mapStateToProps)(BottomPanel);