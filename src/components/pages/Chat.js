import React, { Component } from 'react';
import '../../styles/chat.css';
import moment from 'moment';

class Chat extends Component {

    constructor(props) {
        super(props);
    }    

    createChatBubbles() {
        let appName = this.props.chatMessages.app_name;
        let chat =
        (<ul>
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
        return (chat);
    }

    render() {
        console.log("curr", this.props);
        this.removeScrollFromPanel();
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

    removeScrollFromPanel() {   // remove scroll from panel
        var panel = document.getElementsByClassName("messagePanel");
        for (var i = 0; i < panel.length; i++) { // todo::need to find the right index of the tab instead for loop
            panel[i].scrollTop = 0;
            panel[i].style = "overflow-y: hidden";
        }
    }

    getScrollToPanel() {      // put the scroll to the panel
        var panel = document.getElementsByClassName("messagePanel");
        for (var i = 0; i < panel.length; i++) { // todo::need to find the right index of the tab instead for loop
            panel[i].scrollTop = 0;
            panel[i].style = "overflow-y: scroll";
        }
    }

    closeBtnHandler() {
        this.getScrollToPanel()
        this.props.close();
    }   
}

var strengthClass = {easy: "easy_message", medium: "medium_message", heavy: "heavy_message"}

const ChatBubble = function(props){
    let strength = strengthClass[props.strength];
    let opositeSide = props.side === "right" ? "left" : "right"; 
    let bubble = (
        <li className={"message message-" + props.side}> 
            <div className={(strength !== undefined ? strength : "") + " message-text"}>
                <div className={"sender-" + props.side}>{props.sentBy} <div className={"msg-metadata  message-" + opositeSide}>{props.metaData}</div></div>
                <div className="msg_context" dangerouslySetInnerHTML={{ __html: props.message}} />
                
            </div>
        </li>
    );
    return bubble;
}

export default Chat;