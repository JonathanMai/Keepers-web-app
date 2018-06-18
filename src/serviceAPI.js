import axios from 'axios';
import moment from 'moment';
import store from './store';

const url = "https://keepers-main-vodafone-prod.eu-de.mybluemix.net/keeper-server/";

// Async server call to get the parent profile using parent id and auth key.
// Return promise of server response.
export const GetProfileByID = () => {
    return axios.get(url + "parents/profileById/" + store.getState().AccountInfo.parentId,{
        headers: {
            auth: store.getState().AccountInfo.auth
        }
    });
}

// Async server call to get all the children for specific parent using parent id and auth key.
// Return promise of server response.
export const GetAllChildren = () => {
    return axios.get(url + "parents/getAllChildrenForParent/" + store.getState().AccountInfo.parentId,{
        headers: {
            'Content-Type': "text/plain",
            auth: store.getState().AccountInfo.auth
        }
    });
}

 
// Async server call to get all messages statistics of child with id 
// between startTime and endTime using auth key of the parent.
// Return promise of server response.
export const GetMessagesStatistics = (id, startTime, endTime) => {
    return axios.get(url + "children/" + id + "/statistics?startTime=" + startTime + "&endTime=" + endTime,{
        headers: {
            auth: store.getState().AccountInfo.auth
        }
    });
}

// TODO: ADD start and end times.
// Async server call to get all usage time of the children with id 
// between startTIme and endTime using auth key of the parent.
// Return promise of the server response.
export const GetUsageStatistics = (id, startTime, endTime) =>{
    let body = {childId: id};
    let headers = {headers: {
        'content-type': "application/json",
        auth: store.getState().AccountInfo.auth
    }};

    return axios.post(url + "appUsageTime/queryAllUsages", body, headers); 
}

// Async server call to get all message's headers of child with id 
// between startTime and endTime and the number of page of headers using parent auth key.
// Return promise of the server response.
export const GetMessagesHeads = (id, startTime, endTime, page) => {
    return axios.get(url + "devices/" + id + "/heads?startTime=" + startTime + "&endTime=" + endTime + "&page=" + page,{
        headers: {
            auth: store.getState().AccountInfo.auth
        }
    });
}

// Async server call to get a specific message using child id
// and msgId with auth parent key.  
// Return promise of the server response.
export const GetEntireMessage = (id, msgId) => {
    return axios.get(url + "conversation/" + id + "/" + msgId + "/entire",{
        headers: {
            auth: store.getState().AccountInfo.auth
        }
    });
}


// Async server call to get the battery level using child id and parent auth key.
// Return promise of the server response.
export const GetBatteryLevel = (id) => {
    return axios.get(url + "devices/" + id + "/battery/level",{
        headers: {
            auth: store.getState().AccountInfo.auth
        }
    });
}

// Register new user with name, email and password.
// Return promise of the server response.
export const Register = (name, email, password) => {
    return axios.post(url + "parents/createVodafoneAccount", {
        "name": name,
        "email": email,
        "password": password,
        "isTest": "true"
    });
};

// Login to the user using email and password.
// Return promise of the server response contain user id and user auth.
export const Login = (email, password) => {
    return axios.post(url + "parents/login",{
        "email": email,
        "password": password
    });
};

// Async server call to get the location of the child using child id, and parent auth key.
// Return promise of the server response.
export const GetLocation = (id) => {
    let body = {
        childId: id,
        fromDate: moment().startOf('day'),
        toDate: moment()
    };
    let headers = {headers: {
        'content-type': "application/json",
        auth: store.getState().AccountInfo.auth
    }};

    return axios.post(url + "location/queryInRange",body, headers);
}

// Async server call to get the code after restart password request,
// the code sends to the user email.
export const SendRestartCode = (email) => {
    let body = {
        email: email
    };
    let headers = {headers: {
        'content-type': "application/json"
    }};

    return axios.post(url + "passwordReset/requestPasswordReset", body, headers);
};

// Async server call to change the user password.
// Email - the user email, code - the code user gets to the email, password - new password.
// Returns promise from the server response.
export const ResetPassword = (email, code, password) => {
    let body = {
        email: email,
        passwordFromEmail: code,
        newPermPassword: password
    };
    let headers = {headers: {
        "content-type": "application/json"
    }};

    return axios.post(url + "passwordReset/applyPasswordReset", body, headers);
};  

// Async server call to logout from the server,
// using parent id and parent auth key.
export const LogOut = () => {
    let body = {
        parentId: store.getState().AccountInfo.parentId
    };
    let headers = {headers: {
        "content-type": "application/json",
        auth: store.getState().AccountInfo.auth
    }};

    return axios.post(url + "parents/logout", body, headers);
};  