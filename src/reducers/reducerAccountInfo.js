const initialState = {
    parentId: null,
    auth: null
};

const reducerAccountInfo = (state = initialState, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                parentId: action.value.id,
                auth: action.value.authKey
            };
        default: 
            return state;
    }
};

export default reducerAccountInfo;