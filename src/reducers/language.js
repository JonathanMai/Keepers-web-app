import languages from '../lang/lang';
const initialState = {
    lang: languages,
    currLang: languages.eng
};

const language = (state = initialState, action) => {
    switch(action.type) {
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