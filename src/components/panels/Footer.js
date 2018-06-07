import React, { Component } from 'react';
import logoChat from '../../assets/Home-icon.png'; 
import logoShare from '../../assets/Share-icon.png'; 
import '../../styles/footer.css';
import { connect } from 'react-redux';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            chat_is_shown: false
        };
    }

    render() {
        return (
            <div>
                <div className="footer">
                    <div className="inner_footer">
                        <div className="logo" onClick={this.open_close_consultant.bind(this)}>
                            <img className="img_chat" src={logoChat} />
                        </div>
                        <span className="text1"> {this.props.currLang.consultants} </span>
                        <div className="logo logo2" onClick={this.share.bind(this)}>
                            <img className="img_share" src={logoShare} />
                        </div>
                        <span className="text1"> {this.props.currLang.share} </span>
                    </div>
                </div>
                <div className="chat_screen">
                    <iframe className="chat_frame" src="https://chat-bot-55ed9.firebaseapp.com/">
                        <p>{this.props.currLang.not_support_iframe}</p>
                    </iframe>
                </div>
            </div>);
    }

    open_close_consultant() {
        var screen = document.getElementsByClassName("chat_screen")[0];
        if(this.state.chat_is_shown) {
            screen.style = "display: none;"
        } else {
            screen.style = "display: initial;"
        }
        this.setState({
            chat_is_shown: !this.state.chat_is_shown
        });
    }

    
    share() {
        if(!window.navigator.share) {   // pc
            console.log("This is pc");
            window.location.href = "mailto:?subject=Try%20this%20cool%20consultant%20center!&body=You%20must%20try%20this%20crazy%20app%20here%20is%20the%20link:https://chat-bot-55ed9.firebaseapp.com/";
        } else { // mobile
            navigator.share({
                title: "Keepers web application",
                text: 'Checkout this application of Keepers',
                url: 'https://chat-bot-55ed9.firebaseapp.com/',
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currLang: state.lang.currLang
    };
};

export default connect(mapStateToProps, null)(Footer);