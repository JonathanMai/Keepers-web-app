import React, { Component } from 'react';
import '../../styles/chat.css';
import moment from 'moment';

class Chat extends Component {

    constructor(props) {
        super(props);
    }    

    createChatBubbles() {
        let appName = this.props.chatMessages.app_name;
        // let metaData = 
        let chat =
        (<ul className="chat-message-list">
                {this.props.chatMessages.messages.map((message, index) => {
                    if(message.text !== "") {
                        return (<ChatBubble
                            key={index} 
                            sentBy={message.name}
                            message={message.text}
                            metaData={appName + ", " +(moment(message.time).format("HH:mm A"))}
                            side={(message.is_outgoing ? "right" : "left")}
                            strength={message.strength}
                        />);
                    }
                })}
            </ul>);
        return (chat);
    }

    render() {
        this.removeScrollFromPanel();
        return(
            <div>
                <div className="title">
                    <div> {this.props.chatTitle}
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
        var panel = document.getElementById("messagePanel");
        panel.scrollTop = 0;    // get the scroll up
        panel.style = "overflow-y: hidden";
    }

    getScrollToPanel() {      // put the scroll to the panel
        var panel = document.getElementById("messagePanel");
        panel.style = "overflow-y: scroll";
    }

    closeBtnHandler() {
        this.getScrollToPanel()
        this.props.close();
    }   
}

var strengthClass = {easy: "easy_message", medium: "medium_message", heavy: "heavy_message"}

const ChatBubble = function(props){
    let strength = strengthClass[props.strength];
    //TODO: color border in red if the message is offensive
    let bubble = (
        <li className={"message-" + props.side}> 
            <span className={(strength !== undefined ? strength : "") + " message-text"}>
                <div className={"sender-" + props.side}>{props.sentBy}</div>
                <div dangerouslySetInnerHTML={{ __html: props.message}} />
                <p className="msg-metadata">{props.metaData}</p>
            </span>
        </li>
    );
    return bubble;
//     <li className="message-right">
//     <span className="message-text">Lalalaal</span>
// </li>
//     return(    <li className="message-right">
//     <span className="message-text">Lalalaal</span>
// </li> );
}

{/*const ChatBox = () => {
    return (
        <ul className="chat-message-list">

        <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
     <li className="message-left">
    <   span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-left">
        <span className="message-text">Lalalaal</span>
    </li>
    <li className="message-right">
        <span className="message-text">Lalalaal</span>
    </li>
    </ul>);

} */}

export default Chat;