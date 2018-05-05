import React, { Component } from 'react';
import Box from './Box';
import {Fade} from 'react-bootstrap';
import { GetEntireMessage } from "../serviceAPI";
import moment from 'moment';



class MsgsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEntireMessage: false
        }
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    handleMessageSelect(childId, message) {
        // console.log("hi", index, "crazy");
        // console.log(message);
        GetEntireMessage(childId, message.id).then(res => {  // When respond package is with status 200
            // console.log(res);
            // // console.log(childIndex);
            this.setState({
                showEntireMessage: true,
                childId: childId,
                message: message,
                renderFade: false
            });
            
            this.buildMsgPanel(childId, message);
            console.log(childId, message)
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    buildMsgPanel() {
        // console.log(this.props);
        let messagePanel;
        if(!this.state.showEntireMessage && this.props.childsData.length > 0) {
            messagePanel = this.props.childsData.map((message) =>
                this.buildMessageBox(this.props.child.id, message)
            )}

            // <Box childId={this.state.childrens[index].id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>
        else if(this.state.showEntireMessage) {// Todo: fade in
            messagePanel =  <Fade in={this.state.renderFade} unmountOnExit={true}> 
                <div>
                {this.buildMessageBox(this.state.childId, this.state.message)} 

                {/* <Box childId={this.props.child.id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/> */}
                <button type="button" className="close" aria-label="Close" onClick={this.handleSelect.bind(this)}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
          </Fade>
        }
        console.log("message panel", messagePanel);
        return messagePanel;
    }

    componentDidMount() {
        setTimeout(() => { this.setState({...this.state, renderFade: true}); }, 3000);
    }

    handleSelect() {
        this.setState({showEntireMessage:false});
        console.log(this.state)
    }
    buildMessageBox(childId, message){
        return <Box childId={childId} onClick={this.state.showEntireMessage === false ? this.handleMessageSelect : undefined} message={message}/>
    }

    render(){
        return <div id="messagePanel" ref="messagePanel">{this.buildMsgPanel()}</div>
        // return <div>hiii </div>
    }
}
export default MsgsPanel;
