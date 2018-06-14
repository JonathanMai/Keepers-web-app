const initialState = {
    showModal: false,
    panel_color: "transparent",
    agreement: false,
    showIcon: false
};

const reducerA = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SHOW_MODAL":
            return {
                ...state,
                showModal: action.value
            };
        case "CHANGE_PANEL_COLOR":
            return {
                ...state,
                panel_color: action.value
            };   
        case "SET_AGREEMENT":
            return {
                ...state,
                agreement: action.value
            };   
        case "SET_ICON_VISIBILITY":
            return {
                ...state,
                showIcon: action.value
            }; 
        default: 
            return state;
    }
};

export default reducerA;