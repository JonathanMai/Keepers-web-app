const initialState = {
    showModal: false,
    wrongPassword: null,
    panel_color: "transparent",
    agreement: false
};

const reducerA = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SHOW_MODAL":
            return {
                ...state,
                showModal: action.value
            };
        case "WRONG_PASSWORD_VALIDATION":
            return {
                ...state,
                wrongPassword: action.value
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
        default: 
            return state;
    }
};

export default reducerA;