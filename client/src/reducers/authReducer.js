import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOGOUT_SUCESS,
    REGISTER_SUCESS,
    REGISTER_FAIL,
    LOAD_USER_ARTICLES,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: "",
    articles: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_SUCESS:
        case REGISTER_SUCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: "",
                user: "",
                isAuthenticated: false,
            };
        case LOAD_USER_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };
        default:
            return state;
    }
}
