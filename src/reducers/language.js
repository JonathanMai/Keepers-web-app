import languages from '../lang/lang';

/* 
    This redux reducer save the information about languages of the application.
    Also it has some redux functions to set the language of the application.
*/

// Initial state
const initialState = {
    lang: languages,    // all the languages objects
    currLang: languages.eng // the current language object
};

const language = (state = initialState, action) => {
    switch(action.type) {
        // set the current language object -> action.value is object {key: value}
        case "SET_LANG":
            return {
                ...state,
                currLang: action.value
            };
        default: 
            return state;
    }
};

export default language;