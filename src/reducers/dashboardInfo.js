import moment from 'moment';
const initialState = {
    childrens: [],
    dates: [moment().subtract(1,'w').startOf('day'), moment().endOf('day')],
    datesRange: 7
};

const dashboardInfo = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHILDRENS":
            return {
                ...state,
                childrens: action.value
            };
        case "SET_DATES":
            console.log(action.value);
            let difference = moment.utc(action.value[1]).startOf('day').diff(moment.utc(action.value[0]).startOf('day'), 'days');
            return {
                ...state,
                dates: action.value,
                datesRange: difference
            };
        default: 
            return state;
    }
};

export default dashboardInfo;