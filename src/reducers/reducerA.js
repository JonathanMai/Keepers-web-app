/* 
    This redux reducer save the information about banner/login/register and password reset screens.
    Also it has some redux functions to set the screen variables.
*/

// Initial state
const initialState = {
    showModal: false,       // register modal - boolean variable can be on or off
    panel_color: "transparent", // color of the panel - initial in login its transparent and in dashboard it has keepers color
    agreement: false,       // checkbox of terms - must be true to login
    showIcon: false,        // boolean variable - false in login page and true in dashboard page.
    showLoadingModal: false // loading modal - boolean variable can be on or off while loading
};

const reducerA = (state = initialState, action) => {
    switch(action.type) {
        // action.value is boolean variable can be true or false, set the register modal to be on or off
        case "SET_SHOW_MODAL":
            return {
                ...state,
                showModal: action.value
            };
        // action.value is string variable of color e.g: red, green, blue, etc...
        case "CHANGE_PANEL_COLOR":
            return {
                ...state,
                panel_color: action.value
            };
        // action.value is boolean variable - tick of checkbox can be true or false if the checkbox is checked or not.   
        case "SET_AGREEMENT":
            return {
                ...state,
                agreement: action.value
            };
        // action.value is boolean variable - set the visibility of the logout icon, in login is false and in dashboard must be true
        case "SET_ICON_VISIBILITY":
            return {
                ...state,
                showIcon: action.value,
                panel_color: "rgba(37, 185, 204, 0.45)"
            }; 
        // action.value is boolean variable - set the visibility of loading modal - true if we want to show the loading modal.
        case "SET_SHOW_LOADING_MODAL":
            return {
                ...state,
                showLoadingModal: action.value
            };
        default: 
            return state;
    }
};

export default reducerA;