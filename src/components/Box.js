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
        switch(this.props.level){
            case "heavy":
                return "+3";
            case "medium":
                return "+2";
            default:
                return "+1";
        }
    }
    // assignData() {
    //     switch(this.props.level){
    //         case "easy":
    //             this.level = "+1";
    //             this.className = "box box_yellow";
    //             break;
    //         case "medium":
    //             this.level = "+2";
    //             this.className = "box box_orange";
    //             break;
    //         case "heavy":
    //             this.level = "+3";
    //             this.className = "box box_red";
    //             break;
    //     }
    // }
    getClassName() {
        switch(this.props.level){
            case "heavy":
                return "box box_red";
            case "medium":
                return "box box_orange";
            default:
                return "box box_yellow";
        }
    }

    clickHandleEvent() {
        alert("aaaaaaaa")
    }
}

export default Box;