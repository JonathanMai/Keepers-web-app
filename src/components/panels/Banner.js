import React, { Component } from 'react';
import '../../styles/banner.css';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import logoutImg from '../../assets/logout.png';
import { LogOut } from '../../serviceAPI';
import logoShare from '../../assets/Share-icon.png'; 
import logoChat from '../../assets/Home-icon.png'; 
import closeBtn from '../../assets/close.png'; 


class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            chat_is_shown: false
        };
    }

    render() {
        return (
            <div className="banner" style={{backgroundColor: this.props.color}}>
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
                            <Image alt="log out" className="logout" src={logoutImg} onClick={this.logout.bind(this)} />
                            <div className="logo" onClick={this.open_close_consultant.bind(this)}>
                                <img className="img_chat" src={logoChat} />
                            </div>
                            <div className="logo logo2"  onClick={this.share.bind(this)}>
                                <img className="img_share" src={logoShare} />
                            </div>
                            <div className="chat_screen">
                                <div className="closeBtn">
                                    <img style={{width: 25 + 'px'}} src={closeBtn} onClick={this.open_close_consultant.bind(this)}/>
                                </div>
                                <iframe className="chat_frame" src="https://chat-bot-55ed9.firebaseapp.com/">
                                    <p>{this.props.currLang.not_support_iframe}</p>
                                </iframe>
                            </div>
                        </div>
                    }
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

    logout() {
        LogOut().then(res => {
            localStorage.removeItem("_id");
            localStorage.removeItem("_token");
            this.props.setPanelColor("transparent");
            this.props.setShowLogoutIcon(false);
        }).catch(error => {
            console.log(error.response)
        });
    }

    changeLanguage(e) {
        this.props.setLang(this.props.allLang[e.target.value]);
    }
}

const mapStateToProps = (state) => {
    return {
        allLang: state.lang.lang,
        currLang: state.lang.currLang,
        panel_color: state.reducerA.panel_color,
        showIcon: state.reducerA.showIcon
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLang: (val) => {
            dispatch({
                type: "SET_LANG",
                value: val
            });
        },
        setPanelColor: (val) => {
            dispatch({
                type: "CHANGE_PANEL_COLOR",
                value: val
            });
        },
        setShowLogoutIcon: (val) => {
            dispatch({
                type: "SET_ICON_VISIBILITY",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
