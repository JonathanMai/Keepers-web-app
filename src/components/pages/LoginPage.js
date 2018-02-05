import React, { Component } from 'react';
import SignInForm from '../forms/SignIn';
import RegisterForm from '../forms/RegisterForm';

const LoginPage = (props) => {
    var obj = null;
    if(props.location.pathname === '/login') {
        obj = (
            <div>
                <h1>In login page</h1>
                <SignInForm history={props.history} />
            </div>);
    } else if(props.location.pathname === '/register') {
        obj = (
            <div>
                <h1>In register page</h1>
                <RegisterForm history={props.history} />
            </div>);
    }
    return obj;
}


export default LoginPage;
