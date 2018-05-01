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
        <div level={this.getLevel()} className={this.getClassName()} onClick={this.clickHandleEvent}>
            <Data message={this.props.message}/>
        </div>
    )}

    getLevel() {
        console.log(this.props)
        switch(this.props.level){
            case "easy":
                return "+1";
            case "medium":
                return "+2";
            case "heavy":
                return "+3";
        }
    }
    
    getClassName() {
        switch(this.props.level){
            case "easy":
                return "box box_yellow";
            case "medium":
                return "box box_orange";
            case "heavy":
                return "box box_red";
        }
    }

    clickHandleEvent() {
        alert("aaaaaaaa")
    }
}

export default Box;