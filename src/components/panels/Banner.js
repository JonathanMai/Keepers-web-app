import React, { Component } from 'react';
import '../../styles/banner.css';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import logoutImg from '../../assets/logout.png';
import { LogOut } from '../../serviceAPI';

class Banner extends Component {
   
    render() {
        console.log("PROPS", this.props);
        return (
            <div className="banner" style={{backgroundColor: this.props.color}}>
                <div>
                    <select className="select_lang" onChange={(e) => this.changeLanguage(e)}>
                    {
                        Object.keys(this.props.AllLang).map((val, index) => {
                            return <option key={index} value={val}> {val} </option>
                        })
                    }
                    </select>
                    <Image alt="log out" className="logout" src={logoutImg} onClick={this.logout.bind(this)} />
                </div>
            </div>);
    }

    logout() {
        LogOut().then(res => {
            localStorage.removeItem("_id")
            localStorage.removeItem("_token")
            this.props.history.push('/login');
        }).catch(error => {
            console.log(error.response)
        });
    }

    changeLanguage(e) {
        this.props.setLang(this.props.AllLang[e.target.value]);
    }
}

const mapStateToProps = (state) => {
    return {
        AllLang: state.lang.lang,
        currLang: state.lang.currLang
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLang: (val) => {
            dispatch({
                type: "SET_LANG",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
