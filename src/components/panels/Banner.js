import React, { Component } from 'react';
import '../../styles/banner.css';
import { connect } from 'react-redux';
// import language from '../../lang/lang'

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
                </div>
            </div>);
    }

    changeLanguage(e) {
        this.props.setLang(this.props.allLang[e.target.value]);
    }
}

const mapStateToProps = (state) => {
    return {
        allLang: state.lang.lang,
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
