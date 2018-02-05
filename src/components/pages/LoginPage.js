import React, { Component } from 'react';
import SignInForm from '../forms/SignIn';

const LoginPage = (props) => {
    return (
        <div>
            <h1>In login page</h1>
            <SignInForm history={props.history}/>
        </div>
    );
}


export default LoginPage;
