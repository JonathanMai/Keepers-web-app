import React, { Component } from 'react';
import '../../styles/banner.css';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import logoutImg from '../../assets/logout.png';
import { LogOut } from '../../serviceAPI';

class Banner extends Component {
   
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
                        this.props.showIcon && <Image alt="log out" className="logout" src={logoutImg} onClick={this.logout.bind(this)} />
                    }
                </div>
            </div>);
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
