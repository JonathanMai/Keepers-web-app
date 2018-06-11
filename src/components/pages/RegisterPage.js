import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import { Grid, Row, Col } from 'react-bootstrap';
import '../../styles/login_page.css';

const RegisterPage = (props) => {    
    return (
        <div>
            <h1>In register page</h1>
            <RegisterForm history={props.history} />
        </div>);
}


export default RegisterPage;
