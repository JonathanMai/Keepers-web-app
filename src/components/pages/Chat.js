import React, { Component } from 'react';
import '../../styles/chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        var appName=this.props.chatMessages.app_name;
        // this.createChatBubbles = this.createChatBubbles.bind(this);
    }    

    createChatBubbles() {
        // console.log(this.props.chatMessages);
        let chat =
            (<ul className="chat-message-list">
                {this.props.chatMessages.messages.map((message) => {
                    console.log("MESSAGES R",message);
                    <ChatBubble 
                        // message={message.text}
                        // side={"message-" + message.is_outgoing ? "right" : "left"}
                    />
                })}
            </ul>);
        console.log(chat);
        return (chat);
        // return chat;
    }

    render() {
        console.log(this.props)
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
                    {/* <ChatBubble /> */}
                    <ul className="chat-message-list">
                        {this.props.chatMessages.messages.map((message, index) => {
                            console.log("MESSAGES R",message);
                            <ChatBubble key={"message_"+index}/>
                        // message={message.text}
                        // side={"message-" + message.is_outgoing ? "right" : "left"}
                            
                        })}
                    </ul>
                    {/* {console.log("before create")}
                    {this.createChatBubbles()} */}
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

const ChatBubble = function(props){
    console.log(props);
    // let bubble = (
    //     <li className={props.side}>
    //         <span className="message-text">{props.message}</span>
    //     </li>
    // );
    <li className="message-right">
    <span className="message-text">Lalalaal</span>
</li>
    return(    <li className="message-right">
    <span className="message-text">Lalalaal</span>
</li> );
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