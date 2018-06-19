import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { LogOut } from '../../serviceAPI';
import logoutImg from '../../assets/banner/logout.png';
import logoShare from '../../assets/banner/Share-icon.png'; 
import logoChat from '../../assets/banner/Home-icon.png'; 
import closeBtn from '../../assets/banner/close.png'; 
import '../../styles/banner.css';

/*
    Banner component - in login screen it contains only choose language option.
    In dashboard screen it contains the share button, button to open chatbot, 
    languages option and logout button. 
    In login screen it's background is transparent and
    in dashboard screen it has keeper's color - light blue. 
*/
class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            chat_is_shown: false    // holds chatbot state - screen is open or not.
        };
    }

    // open and close the consultant center
    open_close_consultant() {
        if(this.state.chat_is_shown) {  // if the consultant center is visible set it to invisible
            this.refs.chat_screen.style = "display: none;"
        } else {                        // consultant center is invisible set it to visible
            this.refs.chat_screen.style = "display: initial;"
        }
        this.setState({                 // change the state
            chat_is_shown: !this.state.chat_is_shown
        });
    }

    // share function after the user push on the share icon button in the banner
    share() {
        if(!window.navigator.share) {   // This will work on pc, opens the main program to send emails
            window.location.href = "mailto:?subject=Protect%20Your%20Kid%20With%20Keeper's%20Application&body=You%20must%20have%20this%20tool%20to%20help%20protect%20your%20child.%20%0AThe%20link%20to%20the%20application: %20https://www.keeperschildsafety.net/%0ACya%20there%20=)";
        } else {    // This will work on mobile platforms, ask from user to open messaging application for sending texts
            navigator.share({
                title: "Protect Your Kid With Keeper's Application",
                text: 'You must have this tool to help protect your child.',
                url: 'https://www.keeperschildsafety.net/',
            });
        }
    }

    // logout function - redirects the user to login page and logout from the server
    logout() {
        LogOut().then(res => {  // the server returns response code of 200
            localStorage.removeItem("_id");     // removes the parent id from local storage
            localStorage.removeItem("_token");  // removes the parent auth from local storage
            this.props.setPanelColor("transparent");    // set the panel to be transparent
            this.props.setShowLogoutIcon(false);    // set the icon visibility
        }).catch(error => {     // the server returns response code of 400
            console.error(error.response)
        });
    }

    // change the language of the application
    changeLanguage(e) {
        let language = e.target.value;  // get the language from the select tag
        let languageObj = this.props.allLang[language]; // get the object from redux
        this.props.setLang(languageObj);    // set the new language
    }

    render() {
        return (
            <div className="banner" style={{backgroundColor: this.props.panel_color}}>
                <div>
                    <select className="select_lang" onChange={(e) => this.changeLanguage(e)}>
                    {
                        Object.keys(this.props.allLang).map((val, index) => {  
                            return <option key={index} value={val}> {val} </option>
                        })
                    }
                    </select>
                    {
                        this.props.showIcon &&
                        <div> 
                            <Image alt="logout" className="logout" src={logoutImg} onClick={this.logout.bind(this)} />
                            <div className="logo" onClick={this.open_close_consultant.bind(this)}>
                                <img alt="chat" className="img_chat" src={logoChat} />
                            </div>
                            <div className="logo logo2"  onClick={this.share.bind(this)}>
                                <img alt="share" className="img_share" src={logoShare} />
                            </div>
                            <div ref="chat_screen" className="chat_screen">
                                <div className="closeBtn">
                                    <img alt="close" style={{width: 25 + 'px'}} src={closeBtn} onClick={this.open_close_consultant.bind(this)}/>
                                </div>
                                <iframe title="consultant center" className="chat_frame" src="https://chat-bot-55ed9.firebaseapp.com/">
                                    <p>{this.props.currLang.not_support_iframe}</p>
                                </iframe>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

// redux variables
const mapStateToProps = (state) => {
    return {
        panel_color: state.Modal.panel_color,    // the current panel color of the application
        showIcon: state.Modal.showIcon,   // the current state of show logout icon
        currLang: state.DisplayLanguage.currLang,  // object of the current choosen language
        allLang: state.DisplayLanguage.lang   // all the available languages from lang.js saves as { key: value }
    };
};

//redux functions
const mapDispatchToProps = (dispatch) => {
    return {
        // Set the language of the application
        // val - object of the language e.g:  {title: 'Hi', color: transparent, etc...}
        setLang: (val) => {
            dispatch({
                type: "SET_LANG",
                value: val
            });
        },
        // Set the panel color - in login screen it's transparent, in dashboard screen its light blue
        // val - string of the color, e.g: red, green, blue, etc...
        setPanelColor: (val) => {
            dispatch({
                type: "CHANGE_PANEL_COLOR",
                value: val
            });
        },
        // Set logout icon visibility, in login screen it's invisible and in dashboard screen must be shown for logout
        // val - boolean, true or false
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
