import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyMap from '../MyMap';

class BottomPanel extends Component {
    render(){
        return <div>
        Bottom Panel
    </div>
        return <MyMap />
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens
    };
};

export default connect(mapStateToProps)(BottomPanel);