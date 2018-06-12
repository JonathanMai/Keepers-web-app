import React from 'react';
import SignInForm from '../forms/SignInForm';
import RegisterForm from '../forms/RegisterForm';
import App from '../App';
import { Grid, Row, Col, Checkbox } from 'react-bootstrap';
import '../../styles/login_page.css';
import wave from '../../assets/Wave_main.png';

const LoginPage = (props) => {
    return (
        <div>
        <Grid fluid={true}>
            <Row className="justify-content-center" style={{"marginTop": 15, "height": "80vh"}}>
                <Col className="login_page_container text-center" sm={2} md={2} lg={2}>
                    <p className="intro_text login_page_mid "> The Key to your Child's Safety </p>
                </Col>
                <Col className="login_page_container" sm={8} md={8} lg={8}>
                    <div  id="login_page_form" className="login_page_mid">
                        <SignInForm history={props.history} />
                    </div>
                </Col>
            </Row>
        </Grid>
        <div>
            <img className="wave" src={wave} />
        </div>
        </div>);
}


export default LoginPage;
