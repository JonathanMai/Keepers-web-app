import React from 'react';
import axios from 'axios';

const url = "https://keepers-server-develop-features.eu-gb.mybluemix.net/keeper-server/"

const Login = (email, password) => {
    return axios.post(url + "users/login",{
        'email': 'vin100@vin100.co',
        'password': '123456', 
        'deviceId': 'webClient'
    });
};

export const Register = (name, email, password) => {
    return axios.post(url + "users", {
        "name": name,
        "email": email,
        "password": password,
        "code": generateRandomPIN(),
        "isPaid": false,
        "numOfMessageReads": -1
    });
};

export const ResetPassword = (props) => {

};

export default Login

const generateRandomPIN = function() {
    var random = (Math.random() * 9000) + 1000;
    random = Math.ceil(random);
    return random.toString();
}