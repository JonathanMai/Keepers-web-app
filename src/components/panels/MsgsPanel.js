import React, { Component } from 'react';
import Box from '../Box';
// import {Fade} from 'react-bootstrap';
import { GetMessagesHeads, GetEntireMessage } from '../../serviceAPI';
import moment from 'moment';
import { connect } from 'react-redux';
import Chat from '../pages/Chat';
import '../../styles/messagesPanel.css';

class MsgsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEntireMessage: false,
            messagesHeads: [],
            childId: this.props.childrens[this.props.childIndex].id
        }
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    componentDidMount() {
        this.getMessagesHeads(this.props);
    }

    componentDidUpdate() {
        if(this.props.childIndex ===  this.props.currChild && this.props.update != undefined && !this.props.update[2]){
            this.props.setUpdate(2);
            this.getMessagesHeads(this.props);
        }
    }

    render() {
        return (this.state.messagesHeads !== undefined && <div className="messagePanel" ref="messagePanel">{this.buildMsgPanel()}</div>);
    }

    getMessagesHeads(props) {
        let messagesHeads = [];
        this.addPageToArray(messagesHeads, 0, props, props.startDate, props.endDate);
    }
        
    addPageToArray(messagesHeads, page, props, from, to) {
        GetMessagesHeads(this.state.childId, from, to.endOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                res.data.forEach(element => { 
                    let key = moment(element.time).format("YY-MM-DD");
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
        
    handleMessageSelect(message) {
        GetEntireMessage(this.state.childId, message.id).then(res => {  // When respond package is with status 200
            this.setState({
                ...this.state,
                showEntireMessage: true,
                message: message,
                chat: res.data
            });
            
            this.buildMsgPanel(this.state.childId, message);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    buildMsgPanel() {
        let messagePanel;
        if(!this.state.showEntireMessage && this.state.messagesHeads.length > 0) {
            messagePanel = this.state.messagesHeads.map((message, index) =>
                    this.buildMessageBox(this.state.childId, message, index)
            );
        }

        else if(this.state.showEntireMessage) {
            messagePanel = (
                <div>
                    {this.buildMessageBox(this.state.childId,this.state.message)} 
                    <Chat chatMessages={this.state.chat} childIndex={this.props.childIndex} chatTitle={moment(this.state.message.time).format("MMM, Do")} close={this.handleSelect.bind(this)}/>                    </div>
            );
        }
        return messagePanel;
    }

    handleSelect() {
        this.setState({
            ...this.state,
            showEntireMessage: false,
            childId: 0,
            message: 0
        });
    }

    buildMessageBox(childId, message, index) {
        return <Box key={index} childId={childId} onClick={this.state.showEntireMessage === false ? this.handleMessageSelect : undefined} message={message}/>
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        endDate: state.dashboardInfo.endDate,
        range: state.dashboardInfo.datesRange,
        update: state.dashboardInfo.updateData,
        currChild: state.dashboardInfo.currTab
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        setUpdate: (val) => {
            dispatch({
                type: "SET_UPDATE",
                value: val
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MsgsPanel);