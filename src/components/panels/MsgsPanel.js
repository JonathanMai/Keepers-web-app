import React, { Component } from 'react';
import Box from '../Box';
import { GetMessagesHeads, GetEntireMessage } from '../../serviceAPI';
import moment from 'moment';
import { connect } from 'react-redux';
import Chat from '../pages/Chat';
import '../../styles/messagesPanel.css';
/*
    Messages panel component, build the messages panel inside it, it has
    message boxes of all dangerous conversations between the child and third party
    user.
*/
class MsgsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEntireMessage: false,   // default false to show entire message
            messagesHeads: [],      // messages heads, at default its empty
            childId: this.props.childrens[this.props.childIndex].id     // child id
        }
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    // Ajax call get data from the server
    componentDidMount() {
        this.getMessagesHeads(this.props);
    }

    componentDidUpdate() {
        if(this.props.childIndex ===  this.props.currChild && this.props.update !== undefined && !this.props.update[2]) {
            this.props.setUpdate(2);
            this.getMessagesHeads(this.props);
        }
    }

    // get the message heads from the server
    getMessagesHeads(props) {
        let messagesHeads = [];     // empty array
        this.addPageToArray(messagesHeads, 0, props, props.startDate, props.endDate);   // fill the array from the server resonse
    }
    
    // Async server call get the messages heads from the server
    addPageToArray(messagesHeads, page, props, from, to) {
        GetMessagesHeads(this.state.childId, from, to.endOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                res.data.forEach(element => { 
                    messagesHeads.push(element);
                });
                this.addPageToArray(messagesHeads, page+1, props, from, to);
            }
            else {
                this.setState({
                    ...this.state,
                    messagesHeads: messagesHeads
                });
            }
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }
    
    // get the entire message of message id and set the state
    handleMessageSelect(childId, message) {
        GetEntireMessage(childId, message.id).then(res => {  // When respond package is with status 200
            this.setState({     // update the state
                ...this.state,
                showEntireMessage: true,  
                message: message,
                chat: res.data
            });
            this.buildMsgPanel(childId, message);    // build the message panel
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    // build the message panel
    buildMsgPanel() {
        let messagePanel;
        if(!this.state.showEntireMessage && this.state.messagesHeads.length > 0) {  // if we dont want to see the entire message
            messagePanel = this.state.messagesHeads.map((message, index) =>         // for each message create a message box.
                    this.buildMessageBox(this.state.childId, message, index)
            );
        } else if(this.state.showEntireMessage) {   // we do want to read all the chat about this message
            messagePanel = (
                <div>
                    {/* The the message box we clicked on */}
                    {this.buildMessageBox(this.state.childId, this.state.message)} 
                    {/* show the chat of that specific message */}
                    <Chat chatMessages={this.state.chat} childIndex={this.props.childIndex} chatTitle={moment(this.state.message.time).format("MMM, Do")} close={this.handleSelect.bind(this)}/> 
                </div>
            );
        }
        return messagePanel;
    }

    // after we click close on show chat, update the state to see all the messages
    handleSelect() {
        this.setState({
            ...this.state,
            showEntireMessage: false,
            childId: 0,
            message: 0
        });
    }

    // build the message box of message and send a reference to function to show entire message
    buildMessageBox(childId, message, index) {
        return <Box key={index} childId={childId} onClick={this.state.showEntireMessage === false ? this.handleMessageSelect : undefined} message={message}/>
    }

    render() {
        return (
            this.state.messagesHeads !== undefined &&   // if messages heads are defined build message panel
            <div className="messagePanel" ref="messagePanel">
                {this.buildMsgPanel()}
            </div>
        );
    }
}

// variables of redux
const mapStateToProps = (state) => {
    return {
        childrens: state.DashboardInfo.childrens,   // all the children array
        startDate: state.DashboardInfo.startDate,   // start date
        endDate: state.DashboardInfo.endDate,       // end date
        update: state.DashboardInfo.updateData,     // check if we need to upate the component
        currChild: state.DashboardInfo.currTab      // current child tab
    };
  };

// functions of redux 
const mapDispatchToProps = (dispatch) => {
    return {
        // update the update variable to force/cancel the component update
        setUpdate: (val) => {
            dispatch({
                type: "SET_UPDATE",
                value: val
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MsgsPanel);