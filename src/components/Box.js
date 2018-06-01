import React, {Component} from 'react';
import '../styles/box.css';
import moment from 'moment';

const Data = function(props) {
    return (
        <div>
            <div className="curse">{props.message}</div>
            <p className="under_curse">{props.metaData}</p>
            <span className="go_to">  &#10095;   </span>
        </div>)
}

class Box extends Component {
    render() {
        return (
        <div level={this.getStrength()} className={this.getClassName()} onClick={this.props.onClick !== undefined ? this.clickHandleEvent.bind(this) : undefined}>
            <Data message={this.getQuote()} metaData={this.getMetaData()}/>
        </div>
    )}

    getStrength() {
        switch(this.props.message.strength){
            case "easy":
                return "+1";
            case "medium":
                return "+2";
            case "heavy":
                return "+3";
        }
    }

    getClassName() {
        switch(this.props.message.strength){
            case "easy":
                return "box box_yellow";
            case "medium":
                return "box box_orange";
            case "heavy":
                return "box box_red";
        }
    }

    getQuote() {
        return <div dangerouslySetInnerHTML={{ __html: "\"" + this.props.message.quote + "\""}} />;
    }

    getMetaData() {
        return this.props.message.chat_title + ", " 
            + this.props.message.app_name + ", " 
            + moment(this.props.message.time).format("MMM D");
    }

    clickHandleEvent() {
        // console.log(this.props);
        this.props.onClick(this.props.childId, this.props.message);
    }
}

export default Box;