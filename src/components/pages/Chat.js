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
                    chat is here
                </div>
            </div>
        );
    }

    removeScrollFromPanel() {
        var panel = document.getElementById("messagePanel");
        panel.style = "overflow-y: hidden";
    }

    getScrollFromPanel() {
        var panel = document.getElementById("messagePanel");
        panel.style = "overflow-y: scroll";
    }

    closeBtnHandler() {
        this.getScrollFromPanel()
        this.props.close();
    }

    
}

export default Chat;