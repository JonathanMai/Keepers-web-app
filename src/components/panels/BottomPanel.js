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
            <div className="card" style={{height: 28 + 'vh', padding: 10, marginTop: 10}}>
                <Col xs={10} style={{padding: 0, height: 'auto'}}>
                    <MyMap />
                </Col>   
                <Col xs={2} style={{ padding: 0, height: '-webkit-fill-available'}}>
                    <div  style={{height: '-webkit-fill-available'}}></div>
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