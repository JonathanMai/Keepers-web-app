import React, { Component } from 'react';
import moment from 'moment';
import '../styles/box.css';

/* Stateless component from react responsible to show the data of message box */
const Data = function(props) {
    return (
        <div>
            <div className="curse">{props.message}</div>
            <p className="under_curse">{props.metaData}</p>
            <span className="go_to">  &#10095;   </span>
        </div>)
}

/* State component responsible to show the message box of the chat */
class Box extends Component {
    // returns the level of the message
    getStrength() {
        switch(this.props.message.strength) {
            case "easy":
                return "+1";
            case "medium":
                return "+2";
            case "heavy":
                return "+3";
            default:
                return "+0";
        }
    }

    // returns the class name of the message depend on the level of the message
    getClassName() {
        switch(this.props.message.strength) {
            case "easy":
                return "box box_yellow";
            case "medium":
                return "box box_orange";
            case "heavy":
                return "box box_red";
            default:
                return "box";
        }
    }

    // get the quote of the dangerous message
    getQuote() {
        return <div dangerouslySetInnerHTML={{ __html: "\"" + this.props.message.quote + "\""}} />;
    }

    // get the meta data of the message box formatted
    getMetaData() {
        return this.props.message.chat_title + ", " 
            + this.props.message.app_name + ", " 
            + moment(this.props.message.time).format("MMM D");
    }

    // event on click on the message box
    clickHandleEvent() {
        this.props.onClick(this.props.childId, this.props.message);
    }

    render() {
        return (
        <div level={this.getStrength()} className={this.getClassName()} onClick={this.props.onClick !== undefined ? this.clickHandleEvent.bind(this) : undefined}>
            <Data message={this.getQuote()} metaData={this.getMetaData()}/>
        </div>
    )}
}

export default Box;