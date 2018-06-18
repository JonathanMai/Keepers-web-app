import React, { Component } from 'react';
import SignInForm from '../forms/SignInForm';
import { connect } from 'react-redux';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import wave from '../../assets/login/Wave_main.png';
import emptyV from '../../assets/login/empty_v.png';
import fullV from '../../assets/login/full_v.png';
import '../../styles/login_page.css';

/*
    This is the main login page it called once from the router when the path is /login.
    It has grid layout of title, form and buttom checkbox with terms. 
    It has history in props from router component.
*/
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.changeTerms = this.changeTerms.bind(this);
    }
    
    componentDidMount() {
        this.props.setAgreement(false); // set the checkbox to be unchecked.
    }

    // checkbox on change event occur
    changeTerms() {
        this.props.setAgreement(!this.props.agreement); // if was checked -> uncheck it, else check it
    }

    render() {
        return (
        <div>
            <Grid fluid={true}>
                <Row className="justify-content-center" style={{"marginTop": 25, "height": "80vh"}}>
                    <Col className="login_page_container text-center" sm={2} md={2} lg={2}>
                        <p className="intro_text login_page_mid "> {this.props.currLang.key_child_safety} </p>
                    </Col>
                    <Col className="login_page_container" sm={7} md={7} lg={7}>
                        <div  id="login_page_form" className="login_page_mid">
                            <SignInForm history={this.props.history} />
                        </div>
                    </Col>
                </Row>
            </Grid>
            <div>
                <Image className="wave" src={wave} />
                <div>
                    <Image className="terms" onClick={this.changeTerms} src={this.props.agreement ? fullV : emptyV} />
                    <span> {this.props.currLang.i_accept} <u><a href="https://www.keeperschildsafety.net/eula" target="_blank">{this.props.currLang.terms}</a></u> </span>
                </div>
            </div>
        </div>);
    }
}

// variables from redux
const mapStateToProps = (state) => {
    return {
        agreement: state.Modal.agreement,        // set the checkbox state checked or unchecked
        currLang: state.DisplayLanguage.currLang.login_page    // the current language of the application
    };
};

// function from redux
const mapDispatchToProps = (dispatch) => {
    return {
        setAgreement: (val) => {
            // val is boolean -> update the state of terms checkbox
            dispatch({
                type: "SET_AGREEMENT",
                value: val
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
