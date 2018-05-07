import React, { Component } from 'react';
import { connect } from 'react-redux';

class BottomPanel extends Component {
    render(){
        return <div>
                Bottom Panel
            </div>
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens
    };
};

export default connect(mapStateToProps)(BottomPanel);