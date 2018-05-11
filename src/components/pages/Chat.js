import React, { Component } from 'react';
import '../../styles/chat.css';

class Chat extends Component {
    render() {
        this.removeScrollFromPanel();
        return(
            <div>
                <div className="title">
                    <div> Group Chat
                        <button type="button" className="close" aria-label="Close" onClick={this.closeBtnHandler.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div className="main">
                    <ChatBox />
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

const ChatBox = function() {
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

}

export default Chat;