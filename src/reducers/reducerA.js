const initialState = {
    showModal: false,
    wrongPassword: null
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
        default: 
            return state;
    }
};

export default reducerA;