import React, { Component } from 'react';
import moment from 'moment';
import '../../styles/chat.css';

var strengthClass = {easy: "easy_message", medium: "medium_message", heavy: "heavy_message"};   // object of strength classes

/*
    Chat component that create a chat view of ChatBubble components,
    runs through all the messages we get from the server and create a ChatBubble
    of the message with message, sentBy, side, strength and meta data.
*/
class Chat extends Component {   
    // removes the scroll bar from the panel 
    removeScrollFromPanel() { 
        var panel = document.getElementsByClassName("messagePanel");
        for (var i = 0; i < panel.length; i++) { 
            panel[i].scrollTop = 0;
            panel[i].style = "overflow-y: hidden";
        }
    }

    // set the scroll bar to the panel
    getScrollToPanel() {      
        var panel = document.getElementsByClassName("messagePanel");
        for (var i = 0; i < panel.length; i++) {
            panel[i].scrollTop = 0;
            panel[i].style = "overflow-y: scroll";
        }
    }

    // close button handler
    closeBtnHandler() {
        this.getScrollToPanel()
        this.props.close();
    }  
    
    createChatBubbles() {
        return (
            <ul>
                {this.props.chatMessages.messages.map((message, index) => {
                    if(message.text !== "") {
                        return (<ChatBubble
                            key={index} 
                            sentBy={message.name}
                            message={message.text}
                            metaData={(moment(message.time).format("HH:mm A"))}
                            side={(message.is_outgoing ? "right" : "left")}
                            strength={message.strength}
                        />);
                    }
                })}
            </ul>);
    }

    render() {
        this.removeScrollFromPanel();   // removes the scroll bar from the panel
        return(
            <div>
                <div className="title">
                    <div> <div className="title_text">{this.props.chatTitle}</div>
                        <button type="button" className="close" aria-label="Close" onClick={this.closeBtnHandler.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="main">
                    {this.createChatBubbles()}
                </div>
            </div>
        );
    }
}

/* 
    Stateless component that set the chat bubble message - it has color
    depends on the strength of the message and side, left or right
    depends on who wrote that message the child or he get the message from a friend.
*/
const ChatBubble = function(props){
    let strength = strengthClass[props.strength];   // get the class message depend on the level strength 
    let opositeSide = props.side === "right" ? "left" : "right";    // oposite side of the message 
    return (
        <li className={"message message-" + props.side}> 
            <div className={(strength !== undefined ? strength : "") + " message-text"}>
                <div className={"sender-" + props.side}>
                    {props.sentBy} 
                    <div className={"msg-metadata  message-" + opositeSide}>
                        {props.metaData}
                    </div>
                </div>
                <div className="msg_context" dangerouslySetInnerHTML={{ __html: props.message}} />
            </div>
        </li>
    );
}

export default Chat;