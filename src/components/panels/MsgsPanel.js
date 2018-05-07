import React, { Component } from 'react';
import Box from '../Box';
import {Fade} from 'react-bootstrap';
import { GetMessagesHeads, GetEntireMessage } from '../../serviceAPI';
import moment from 'moment';
import { connect } from 'react-redux';

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
        console.log(this.props);
        GetMessagesHeads(this.props.childrens[this.props.childIndex].id, moment.utc(this.props.dates[0]).startOf('day'), moment.utc(this.props.dates[1]).endOf('day'), page).then(res => {  // When respond package is with status 200
            if(res.data.length > 0) {
                res.data.map(message => messagesHeads.push(message));
                this.addPageToArray(messagesHeads, page+1);
                // console.log(this.state.childrensData[index])
            }
            else {
                console.log(messagesHeads);
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
                renderFade: false
            });
            
            this.buildMsgPanel(childId, message);
            console.log(childId, message)
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }

    buildMsgPanel(childId, message) {
        // console.log(this.props);
        let messagePanel;
        if(!this.state.showEntireMessage && this.state.data.length > 0) {
            messagePanel = this.state.data.map((message) =>
                // console.log(this.props.childId));
                this.buildMessageBox(this.props.childrens[this.props.childIndex].id, message)
        );}

            // <Box childId={this.state.childrens[index].id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/>
        else if(this.state.showEntireMessage) {// Todo: fade in
            // messagePanel =  <Fade in={this.state.renderFade} unmountOnExit={true}> 
            messagePanel = 
                <div>
                    {this.buildMessageBox(this.state.childId,this.state.message)} 

                    {/* <Box childId={this.props.child.id} msgId={message.id} onClick={this.handleMessageSelect} message={message.quote} level={message.strength} metaData={message.chat_title + ", " + message.app_name + ", " + moment(message.time).add(parseInt(moment().format("Z")), 'hours').format("MMM D")}/> */}
                    <button type="button" className="close" aria-label="Close" onClick={this.handleSelect.bind(this)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
          {/* </Fade> */}
        }
        return messagePanel;
    }

    componentDidMount() {
        setTimeout(() => { this.setState({...this.state, renderFade: true}); }, 3000);
    }

    handleSelect() {
        this.setState({
            ...this.state,
            showEntireMessage: false,
            childId: 0,
            message: 0,
            renderFade: false
        });
        console.log(this.state)
    }
    buildMessageBox(childId, message){
        return <Box childId={childId} onClick={this.state.showEntireMessage === false ? this.handleMessageSelect : undefined} message={message}/>
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