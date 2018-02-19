import axios from 'axios';

const url = "https://keepers-main-bezeq-qa.eu-gb.mybluemix.net/keeper-server/parents/";
const auth = "0bb4f5a1-7c07-4da5-8712-15fbf32dea1e";
const parentId = 521;
const phoneNumber = 9720540000004;

export const GetById = () => {
    return axios.get(url + "getById/" + parentId,{
        headers: {
            auth: auth
        }
    });
}

export const GetProfileByID = () => {
    return axios.get(url + "profileById/" + parentId,{
        headers: {
            auth: auth
        }
    });
}

export const GetAllChildren = () => {
    return axios.get(url + "getAllChildrenForParent/" + parentId,{
        headers: {
            auth: auth
        }
    });
}


// ------------------------------------------------------------------------------------------------------------------------------
//      Old method and api calls(Login and user related calls) - not used for now.
// const url = "https://keepers-server-develop-features.eu-gb.mybluemix.net/keeper-server/"

// Login api - login to user using email and password.
export const Login = (email, password) => {
    return axios.post(url + "users/login",{
        "email": email,
        "password": password, 
        "deviceId": 'webClient'
    });
};

// Register api - register new user using name, email and password.
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

// Request a code to restart password using email.
export const SendRestartCode = (email) => {
    return axios.head(url + "users/reset",{
        params: {
            "email": email
        }       
    });
};

// Restart password using code sent to email.
export const ResetPassword = (email, password, code) => {
    return axios.post(url + "users/reset",{
        "email": email,
        "password": password,
        "code": code

    });
};

const generateRandomPIN = function() {
    var random = (Math.random() * 9000) + 1000;
    random = Math.ceil(random);
    return random.toString();
}
