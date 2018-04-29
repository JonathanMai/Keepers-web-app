import React, {Component} from 'react';
import '../styles/box.css';

const Data = function(props) {
    return (
        <div>
            <div className="curse">{props.message}</div>
            <p className="under_curse"> Tom Willsom, Facebook, Apr 29 </p>
            <span className="go_to">  &gt;   </span>
        </div>)
}

class Box extends Component {
    render() {
        return (
        <div level={this.props.level} className={this.getClassName()} onClick={this.clickHandleEvent}>
            <Data message={this.props.message}/>
        </div>
    )}

    getClassName() {
        if(this.props.level === "+3") {
            return "box box_red";
        } else if(this.props.level === "+2") {
            return "box box_orange";
        } else {
            return "box box_green";
        }
    }

    clickHandleEvent() {
        alert("aaaaaaaa")
    }
}

export default Box;