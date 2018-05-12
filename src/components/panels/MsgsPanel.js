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
            data: []
        }
        this.getMessagesHeads();
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    getMessagesHeads() {
        let messagesHeads = [];
        this.addPageToArray(messagesHeads, 0);
        // let tempDraw = this.state.draw;
        // let childrensData = this.state.childrensData;
        // childrensData[index] = Object.assign({messagesHeads: messagesHeads}, this.state.childrensData[index]);
        // tempDraw[1] = true;
        // this.setState({
        //     ...this.state,
        //     childrensData: childrensData
        // });
        // this.setState({
        //     ...this.state,
        //     draw: tempDraw,
        //     messagesHeads: messagesHeads
        // })
        // console.log(this.state.draw);
    }
        
    addPageToArray(messagesHeads, page) {
        GetMessagesHeads(this.props.childrens[this.props.childIndex].id, moment.utc(this.props.dates[0]).startOf('day'), moment.utc(this.props.dates[1]).endOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                res.data.forEach(element => {
                    messagesHeads.push(element);
                });
                this.addPageToArray(messagesHeads, page+1);
                // console.log(this.state.childrensData[index])
            }
            else {
                // let tempDraw = this.state.draw;
                // let data = this.state.data;
                // data[index] = Object.assign({messagesHeads: messagesHeads}, this.state.childrensData[index]);
                // tempDraw[1] = true;
                this.setState({
                    ...this.state,
                    data: messagesHeads
                });
            }
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }
        

    handleMessageSelect(childId, message) {
        // console.log("hi", index, "crazy");
        // console.log(message);
        GetEntireMessage(childId, message.id).then(res => {  // When respond package is with status 200
            // console.log(res);
            // // console.log(childIndex);
            this.setState({
                ...this.state,
                showEntireMessage: true,
                childId: childId,
                message: message,
                chat: res.data
            });
            
            this.buildMsgPanel(childId, message);
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    buildMsgPanel(childId, message) {
        // console.log(this.props);
        let messagePanel;
        if(!this.state.showEntireMessage && this.state.data.length > 0) {
            messagePanel = this.state.data.map((message, index) =>
                // console.log(this.props.childId));
                this.buildMessageBox(this.props.childrens[this.props.childIndex].id, message, index)
        );}

            // <Box childId={this.state.childrens[index].id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>
        else if(this.state.showEntireMessage) {
            messagePanel = (
                <div>
                    {this.buildMessageBox(this.state.childId,this.state.message)} 
                    <Chat chatMessages={this.state.chat} chatTitle={this.state.message.is_group_chat ? "Group chat" : this.state.message.chat_title} close={this.handleSelect.bind(this)}/>
                </div>
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

    buildMessageBox(childId, message, index){
        return <Box key={index} childId={childId} onClick={this.state.showEntireMessage === false ? this.handleMessageSelect : undefined} message={message}/>
    }

    render(){
        return (this.state.data !== undefined && <div id="messagePanel" ref="messagePanel">{this.buildMsgPanel()}</div>);
        // return <div>hiii </div>
    }
}

const mapStateToProps = (state) => {
    return {
        childrens: state.dashboardInfo.childrens,
        dates: state.dashboardInfo.dates,
        range: state.dashboardInfo.datesRange
    };
  };
  
  
export default connect(mapStateToProps)(MsgsPanel);