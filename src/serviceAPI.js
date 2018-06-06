import axios from 'axios';
import JQuery from 'jquery';
import moment from 'moment';

const url = "https://keepers-main-vodafone-dev.eu-de.mybluemix.net/keeper-server/";
const auth = "72d4444e-6f10-4b88-91eb-0fadf1ce511d";
const parentId = 11;
const phoneNumber = "9720527078570";

export const GetById = () => {

    // return axios.get(url + "parents/getById/" + parentId,{
    //     headers: {
    //         auth: auth
    //     }
    // });
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
            'Content-Type': "text/plain",
            auth: auth
        }
    });
}

export const GetMessagesStatistics = (id, startTime, endTime) => {
    return axios.get(url + "children/" + id + "/statistics?startTime=" + startTime + "&endTime=" + endTime,{
        headers: {
            auth: auth
        }
    });
}

//TODO: ADD start and end times.
export const GetUsageStatistics = (id, startTime, endTime) =>{
    let body = {childId: id};
    let headers = {headers: {
        'content-type': "application/json",
        auth: auth
    }};

    return axios.post(url + "appUsageTime/queryAllUsages", body, headers); 
}

export const GetMessagesHeads = (id, startTime, endTime, page) => {
    // console.log("id:",id,", start time:", startTime, ", end time:",endTime,", page:", page)
    return axios.get(url + "devices/" + id + "/heads?startTime=" + startTime + "&endTime=" + endTime + "&page=" + page,{
        headers: {
            auth: auth
        }
    });
}

export const GetEntireMessage = (id, msgId) => {
    return axios.get(url + "conversation/" + id + "/" + msgId + "/entire",{
        headers: {
            auth: auth
        }
    });
}

export const GetBatteryLevel = (id) => {
    return axios.get(url + "devices/" + id + "/battery/level",{
        headers: {
            auth: auth
        }
    });
}

export const GetCurrentLocation = (id) => {
    let body = {
        childId: id,
        fromDate: moment().startOf('day'),
        toDate: moment()
    };
    let headers = {headers: {
        'content-type': "application/json",
        auth: auth
    }};

    return axios.post(url + "location/queryInRange",{
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

export const GetLocation = (id, fromDate, toDate) => {
    let body = {
        childId: id,
        fromDate: fromDate,
        toDate: toDate
    };
    let headers = {headers: {
        'content-type': "application/json",
        auth: auth
    }};

    return axios.post(url + "location/queryInRange",body, headers);
}

const generateRandomPIN = function() {
    var random = (Math.random() * 9000) + 1000;
    random = Math.ceil(random);
    return random.toString();
}
