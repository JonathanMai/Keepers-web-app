import axios from 'axios';

const url = "https://keepers-main-bezeq-qa.eu-gb.mybluemix.net/keeper-server/";
const auth = "75a82246-c6be-495f-b431-5cbbec8a86e8";
const parentId = 31;
const phoneNumber = "9720527078570";

export const GetById = () => {
    return axios.get(url + "parents/getById/" + parentId,{
        headers: {
            auth: auth
        }
    });
}

export const GetProfileByID = () => {
    return axios.get(url + "parents/profileById/" + parentId,{
        headers: {
            auth: auth
        }
    });
}

export const GetAllChildren = () => {
    return axios.get(url + "parents/getAllChildrenForParent/" + parentId,{
        headers: {
            auth: auth
        }
    });
}

export const GetMessagesStatistics = (id, startTime, endTime) => {
    console.log(startTime);
    console.log(endTime);
    return axios.get(url + "children/" + id + "/statistics?startTime=" + startTime + "&endTime=" + endTime,{
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
