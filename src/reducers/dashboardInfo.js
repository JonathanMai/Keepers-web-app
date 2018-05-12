import moment from 'moment';
const initialState = {
    childrens: [],
    dates: [],
    datesRange: 0
};

const dashboardInfo = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHILDRENS":
            return {
                ...state,
                childrens: action.value
            };
        case "SET_DATES":
        // console.log(moment.utc(action.value[1]).startOf('day').diff(moment.utc(action.value[0]).startOf('day'), 'days') )

            return {
                ...state,
                dates: action.value,
                datesRange: (action.value.length > 1) ? moment.utc(action.value[1]).startOf('day').diff(moment.utc(action.value[0]).startOf('day'), 'days') : 1
            };
        default: 
            return state;
    }
};

export default dashboardInfo;