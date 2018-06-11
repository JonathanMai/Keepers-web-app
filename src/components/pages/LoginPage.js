import React from 'react';
import SignInForm from '../forms/SignInForm';
import RegisterForm from '../forms/RegisterForm';
import App from '../App';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../styles/login_page.css';

const LoginPage = (props) => {
    return (
        <Grid>
            <Row>
            <Col sm={12} md={3} lg={2}>
                <p className="intro_text"> The Key to your Child's Safety </p>
            </Col>
            <Col sm={0} md={9} lg={9} lgOffset={1}>
                <Row>
                    asdasdasdasd
                </Row>
                <Row>
                    <SignInForm history={props.history} />
                </Row>
            </Col>
            </Row>
            <Row>
                asdsdffgsdfgsdfgsdf gsdfg sdfg sdfg dsf
            </Row>
        </Grid>);
}


export default LoginPage;
