import React, { Component } from 'react';
import Box from '../Box';
// import {Fade} from 'react-bootstrap';
import { GetMessagesHeads, GetEntireMessage } from '../../serviceAPI';
import moment from 'moment';
import { connect } from 'react-redux';
import jQuery from 'jquery';
import Chat from '../pages/Chat';
import '../../styles/messagesPanel.css';

class Msgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEntireMessage: false,
            messagesHeads: [],
            childId: this.props.childId
        }
        this.getMessagesHeads(this.props);
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            messagesHeads: []
        });
        this.getMessagesHeads(props);
    }

    getMessagesHeads(props) {
        let messagesHeads = [];
        this.addPageToArray(messagesHeads, 0, props, newData, props.startDate, props.endDate);
    }
        
    addPageToArray(messagesHeads, page, props, newData, from, to) {
        GetMessagesHeads(this.state.childId, from, to.endOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                res.data.forEach(element => { 
                    let key = moment(element.time).format("YY-MM-DD");
                    messagesHeads.push(element);
                });
                this.addPageToArray(messagesHeads, page+1, props, newData, from, to);
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
        

    handleMessageSelect(childId, message) {
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

                // <Box childId={this.state.childrens[index].id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>
        else if(this.state.showEntireMessage) {
            messagePanel = (
                <div>
                    {this.buildMessageBox(this.state.childId,this.state.message)} 
                    <Chat chatMessages={this.state.chat} childIndex={this.props.childIndex} chatTitle={moment(this.state.message.time).format("MMM, Do")} close={this.handleSelect.bind(this)}/>                    </div>
            );
        }
        return messagePanel;
    }

    // componentDidMount() {
    //     setTimeout(() => { this.setState({...this.state, renderFade: true}); }, 3000);
    // }

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

    render() {
        return (this.state.messagesHeads !== undefined && <div className="messagePanel" ref="messagePanel">{this.buildMsgPanel()}</div>);
    }
}

function MsgsPanel(props) {
    return <Msgs childId={props.childrens[props.childIndex].id} startDate={props.startDate} endDate={props.endDate} range={props.range} />
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        startDate: state.dashboardInfo.startDate,
        endDate: state.dashboardInfo.endDate,
        range: state.dashboardInfo.datesRange
    };
  };

export default connect(mapStateToProps)(MsgsPanel);