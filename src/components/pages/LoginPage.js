import React, { Component } from 'react';
import SignInForm from '../forms/SignInForm';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import '../../styles/login_page.css';
import wave from '../../assets/Wave_main.png';
import emptyV from '../../assets/empty_v.png';
import fullV from '../../assets/full_v.png';
import { connect } from 'react-redux';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.changeTerms = this.changeTerms.bind(this);
    }
    render() {
        return (
        <div>
            <Grid fluid={true}>
                <Row className="justify-content-center" style={{"marginTop": 15, "height": "80vh"}}>
                    <Col className="login_page_container text-center" sm={2} md={2} lg={2}>
                        <p className="intro_text login_page_mid "> The Key to your Child's Safety </p>
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
                    <span> I accept <u><a href="https://www.keeperschildsafety.net/eula" target="_blank">the terms</a></u> </span>
                </div>
            </div>
        </div>);
    }

    changeTerms() {
        this.props.setAgreement(!this.props.agreement);
    }
}

const mapStateToProps = (state) => {
    return {
        agreement: state.reducerA.agreement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAgreement: (val) => {
            dispatch({
                type: "SET_AGREEMENT",
                value: val
            });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
