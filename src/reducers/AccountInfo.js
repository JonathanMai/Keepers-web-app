/* 
    This redux reducer save the information of parent id and auth key of the parent.
    We need it because we use it almost in every component that has ajax call.
    Also it has some redux functions to set the user variable.
*/

// Initial state
const initialState = {
    parentId: null,
    auth: null
};

const reducerAccountInfo = (state = initialState, action) => {
    switch(action.type) {
        // Sets the parent id and auth key for the parent
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