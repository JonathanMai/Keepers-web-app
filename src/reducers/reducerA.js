const reducerA = (state = {showModal: false}, action) => {
    switch(action.type) {
        case "SET_SHOW_MODAL":
            return {
                ...state, showModal: action.value
            };
        default: 
            return state;
    }
};

export default reducerA;