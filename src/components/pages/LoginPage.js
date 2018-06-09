import React from 'react';
import SignInForm from '../forms/SignInForm';
import RegisterForm from '../forms/RegisterForm';
import App from '../App';

const LoginPage = (props) => {
    var obj = null;
    if(props.location.pathname === '/login') {
        obj = (
            <div>
                <h1>In login page</h1>
                {   localStorage.getItem("_id") !== null && localStorage.getItem("_token") !== null ? <App /> : <SignInForm history={props.history} /> }
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
