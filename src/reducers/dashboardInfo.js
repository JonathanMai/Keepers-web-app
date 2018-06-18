import moment from 'moment';
/* 
    This redux reducer save the information about dashboard component.
    It has information about map, graphs and messages inside the component.
    It has some redux functions to set the dashboard variables and control the states.
*/
// Initial state
const initialState = {
    childrens: [],                          // children of the parent
    currTab: 0,                             // current active child
    startDate: moment().startOf('day'),     // start date default today
    endDate: moment().endOf('day'),         // end date defualt today
    datesRange: 1,                          // range between two startDate and endDate, default is 1.
    datesText: "",                          // text that shown inside date picker input.
    activeDates: 0,                         // day = 0, week = 1, month = 2, default = 3 , active tab for date picker.
    isOneDay: true,                         // true if startDate is equals endDate else false 
    defaultZoom: 16,                        // the default zoom in map component
    updateData: [false, false, false, false]       // [line chart, bar chart, msg heads]
};

const dashboardInfo = (state = initialState, action) => {
    switch(action.type) {
        // set the array of children from ajax call
        case "SET_CHILDRENS":
            return {
                ...state,
                childrens: action.value,
            };
        // set the current tab and update all the components inside the dashboard
        case "SET_TAB":
            return{
                ...state,
                currTab: action.value,
                updateData: [false, false, false, false]   // if false then needs to be updated
            }
        // set the startDate, endDate, datesRange, isOneDay, and update the components inside the dashboard.
        case "SET_DATES":
            let difference = moment(action.value[1]).startOf('day').diff(moment(action.value[0]).startOf('day'), 'days');
            let isSame = moment(action.value[0]).startOf('day').isSame(moment(action.value[1]).startOf('day'));
            let newUpdateData = state.updateData;
            newUpdateData[0] = false;
            newUpdateData[1] = false;
            newUpdateData[2] = false;
            return {
                ...state,
                startDate: moment(action.value[0]).startOf('day'),
                endDate: moment(action.value[1]).endOf('day'),
                datesRange: difference,
                isOneDay: isSame,
                updateData: newUpdateData
            };
        // set the text in date picker input
        case "SET_TEXT":
            return {
                ...state,
                datesText: action.value
            };
        // update the date tab - day, week or month.
        case "SET_ACTIVE":
            return {
                ...state,
                activeDates: action.value
            };
        // set the zoom of the map component
        case "SET_ZOOM":
            return {
                ...state,
                defaultZoom: action.value
            };
        // set of which component should be refreshed.
        case "SET_UPDATE":
            let update = state.updateData;
            update[action.value] = true;
            return {
                ...state,
                updateData: update
            };
        default: 
            return state;
    }
};

export default dashboardInfo;