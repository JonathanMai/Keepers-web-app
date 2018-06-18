import moment from 'moment/min/moment-with-locales';

const initialState = {
    childrens: [],
    currTab: 0,
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
    datesRange: 1,
    datesText: "",
    activeDates: 0,
    isOneDay: true,
    defaultZoom: 16,
    updateData: [] // [line chart, bar chart, msg heads, map, battery]
};

const dashboardInfo = (state = initialState, action) => {
    let newUpdateData;
    switch(action.type) {
        case "SET_CHILDRENS":
            return {
                ...state,
                childrens: action.value,
                updateDate: [new Array(action.value.length), new Array(action.value.length), new Array(action.value.length), false, false]
            };
        case "SET_TAB":
            return{
                ...state,
                currTab: action.value,
                updateData: [false, false, false, false, false]
            }
        case "SET_DATES":
            let difference = moment(action.value[1]).startOf('day').diff(moment(action.value[0]).startOf('day'), 'days');
            let isSame = moment(action.value[0]).startOf('day').isSame(moment(action.value[1]).startOf('day'));
            let newUpdateData = state.updateData;
            newUpdateData[0] = false;
            newUpdateData[1] = false;
            newUpdateData[2] = false;
            // for(let i = 0; i < state.childrens.length; i++) {
            //     newUpdateData[0][i] = newUpdateData[1][i] = newUpdateData[2][i] = false;
            // }
            return {
                ...state,
                startDate: moment(action.value[0]).startOf('day'),
                endDate: moment(action.value[1]).endOf('day'),
                datesRange: difference,
                isOneDay: isSame,
                updateData: newUpdateData
            };
        case "SET_TEXT":
            return {
                ...state,
                datesText: action.value
            };
        case "SET_ACTIVE":
            return {
                ...state,
                activeDates: action.value
            };
        case "SET_ZOOM":
            return {
                ...state,
                defaultZoom: action.value
            };
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