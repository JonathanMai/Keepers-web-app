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
            data: {},
            useData: [],
            childId: this.props.childId
        }
        this.getMessagesHeads(this.props);
        this.buildMsgPanel = this.buildMsgPanel.bind(this);
        this.handleMessageSelect = this.handleMessageSelect.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            useData: []
        });
        this.getMessagesHeads(props);
    }

    getMessagesHeads(props) {
        let messagesHeads = [];
        let newData = this.state.data;
        let startDate = -1;
        let endDate = -1;
        let stam = {}
        // console.log(stam, )
        if(jQuery.isEmptyObject(newData)) {
            this.addPageToArray(messagesHeads, 0, props, newData, props.startDate, props.endDate);
        }
        else {
            console.log(props);
            for(let i = props.range; i > 0; i--) {
                let flag = 0;
                let key = moment(props.startDate).add(i, 'days').format("YY-MM-DD");
                if(newData[key] === undefined) {
                    this.addPageToArray(messagesHeads, 0, props, newData, moment(props.startDate).add(i-1, 'days'), moment(props.startDate).add(i, 'days'), flag);
                }
                else {
                    if(newData[key] !== -1) {
                        // newData[key].map((message) => { 
                        //     messagesHeads.push(message)
                        // });
                        Object.keys(newData[key]).forEach((subKey) => {
                            console.log(newData[key][subKey])
                            messagesHeads.push(newData[key][subKey]);
                        });
                    }
                }
            }
            console.log(messagesHeads)
            this.setState({
                ...this.state,
                useData: messagesHeads
            });
        }
        // else {
        //     for(let i = props.range; i >= 0; i--)
        //     {
        //         let key = moment(props.startDate).add(i, 'days').format("YY-MM-DD");
        //         if(newData[key] === undefined) {
        //             if(startDate === -1) {
        //                 startDate = i;
        //                 endDate = i;
        //             }
        //             else {
        //                 endDate = i;
        //             }
        //         }
                // else {
                    // newData[key].forEach(element => 
            //             messagesHeads.push(element)
            //         );
                // }
            // }
            // this.addPageToArray(messagesHeads, 0, props, newData, moment(props.startDate).add(startDate, 'days'), moment(props.startDate).add(endDate, 'days'));
        // }
            // else {
            // console.log(props);
            // for(let i = props.range; i >= 0; i++) {
            //     let key = moment(props.startDate).add(i, 'days').format("YY-MM-DD");
            //     if(newData[key] === undefined) {
            //         // this.addPageToArray(messagesHeads, 0, props, newData, moment(props.startDate).add(i-1, 'days'), moment(props.startDate).add(i, 'days'));
            //     }
            //     else {
            //         newData[key].forEach(element => 
            //             messagesHeads.push(element)
            //         );
            //     }
            // }
        // }
    }
        
    addPageToArray(messagesHeads, page, props, newData, from, to) {
        console.log(this.state.childId, moment(from),"API");
        GetMessagesHeads(this.state.childId, from, to.endOf('day'), page).then(res => {  // When respond package is with status 200
            // console.log(res.data);
            if(res.data.length > 0) {
                res.data.forEach(element => { // {18-05-18: [{},{},{}] }
                    console.log(newData);
                    let key = moment(element.time).format("YY-MM-DD");
                    
                    if(newData[key] === undefined)
                        newData[key] = {};
                    // else if(newData[key]) {
                        
                    // }
                    else if(newData[key][element.id] === undefined)
                        newData[key][element.id] = element;
                    messagesHeads.push(element);
                });
                // console.log(newData);

                this.addPageToArray(messagesHeads, page+1, props, newData, from, to);
            }
            else {
                console.log(to);
                for(let i = 0; i <= props.range; i++) {
                    let key = moment(from).add(i, 'days').format("YY-MM-DD");
                    // console.log(key)
                    if(newData[key] === undefined)  newData[key] = -1;
                }
                this.setState({
                    ...this.state,
                    data: newData,
                    useData: messagesHeads
                });
                console.log(newData);
            }
        }).catch(error => { // When respond package is with error status - 400 ...
            console.log(error);
        });
    }
        

    handleMessageSelect(childId, message) {
        // console.log("hi", index, "crazy");
        // console.log(message);
        GetEntireMessage(this.state.childId, message.id).then(res => {  // When respond package is with status 200
            // console.log(res);
            // // console.log(childIndex);
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
        if(!this.state.showEntireMessage && this.state.useData.length > 0) {
            messagePanel = this.state.useData.map((message, index) =>
                // console.log(this.props.childId));
                    this.buildMessageBox(this.state.childId, message, index)
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
        return (this.state.useData !== undefined && <div id="messagePanel" ref="messagePanel">{this.buildMsgPanel()}</div>);
    }
}

function MsgsPanel(props) {
    // console.log(props);
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