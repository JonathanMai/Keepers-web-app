import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Image } from 'react-bootstrap';
import MyMap from '../MyMap';
import "../../styles/bottomPanel.css";
import "../../styles/box.css";
import b100 from '../../assets/battery/100%.png';
import b95 from '../../assets/battery/95%.png';
import b70 from '../../assets/battery/70%.png';
import b40 from '../../assets/battery/40%.png';
import b15 from '../../assets/battery/15%.png';

class BottomPanel extends Component {
    constructor(props) {
        super(props);
        this.getBatteryColor = this.getBatteryColor.bind(this);
        this.getBatteryImageIndex = this.getBatteryImageIndex.bind(this);
        let initBatteryLevel = [37, 94, 8];
        this.state = {
            batteryLevel: initBatteryLevel,
            color: this.getBatteryColor(initBatteryLevel),
            batteryImages: [b100, b95, b70, b40, b15],
            bIndex: [this.getBatteryImageIndex(initBatteryLevel[0]), this.getBatteryImageIndex(initBatteryLevel[1]), this.getBatteryImageIndex(initBatteryLevel[2])]
        }

        

        // setInterval(() => {
        //     let level = this.state.batteryLevel;
        //     if(level <= 0) {
        //         level = 100;
        //     }
        //     let color = this.getBatteryColor(level);
        //     let index = this.getBatteryImageIndex(level);
        //     this.setState({
        //         ...this.state,
        //         batteryLevel: level - 1,
        //         color: color,
        //         bIndex: index
        //     });
        // }, 2000);
    }

    getBatteryImageIndex(level) {
        if(level > 95 && level <= 100) {
            return 0;
        } else if(level > 70 && level <= 95) {
            return 1;
        } else if(level > 50 && level <= 70) {
            return 2;
        } else if(level > 15 && level <= 50) {
            return 3;
        } else {    // level <= 15
            return 4;
        }
    }

    getBatteryColor(level) {
        if(level > 50 && level <= 100) {
            return "green";
        }
        else if(level > 15 && level <= 50) {
            return "orange";
        }
        else if(level <= 15) {
            return "red";
        }
    }
    render(){
        return(
            <div className="card" style={{height: 29 + 'vh', padding: 10, marginTop: 10}}>
                <Col xs={10} style={{padding: 0, height: 'auto'}}>
                    <MyMap />
                </Col>   
                <Col xs={2} style={{ padding: 0, height: '-webkit-fill-available'}}>
                    <div style={{height: '-webkit-fill-available', marginLeft: 10, padding: 5, textAlign: "center"}}>
                        <p style={{color: this.state.color}} className="battery_usage"> {this.props.currLang.batteryState} </p>
                        <div className="bImage">
                            <Image src={this.state.batteryImages[this.state.bIndex[this.props.currKid]]} />
                        </div>
                        <div style={{color: this.state.color, fontSize: 30, marginTop: 10, fontWeight: "bold"}}>
                            {this.state.batteryLevel[this.props.currKid]}%
                        </div>
                    </div>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        currKid: state.dashboardInfo.currTab,
        currLang: state.lang.currLang
    };
};

export default connect(mapStateToProps)(BottomPanel);