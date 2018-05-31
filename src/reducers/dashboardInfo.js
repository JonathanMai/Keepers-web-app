import moment from 'moment';
const initialState = {
    childrens: [],
    currTab: 0,
    startDate: moment().subtract(1,'w').startOf('day'),
    endDate: moment().startOf('day'),
    datesRange: 7,
    datesText: "",
    isOneDay: false
};

const dashboardInfo = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHILDRENS":
            return {
                ...state,
                childrens: action.value
            };
        case "SET_TAB":
            return{
                ...state,
                currTab: action.value
            }
        case "SET_DATES":
            // console.log(action.value);
            let difference = moment(action.value[1]).startOf('day').diff(moment(action.value[0]).startOf('day'), 'days');
            let isSame = action.value[0].isSame(action.value[1]);
            // if(!action.value[0].isSame(action.value[1]) && difference === 1)
            //     difference += 1;
            // console.log(moment(action.value[1]).startOf('day').diff(moment(action.value[0]).startOf('day'), 'days'));

            return {
                ...state,
                startDate: action.value[0],
                endDate: action.value[1],
                datesRange: difference,
                isOneDay: isSame
            };
        case "SET_TEXT":
            return {
                ...state,
                datesText: action.value
            };
        default: 
            return state;
    }
};

export default dashboardInfo;