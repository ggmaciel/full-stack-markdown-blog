import axios from "axios";
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

import { getErrors } from "./errorActions";
import { clearErrors } from "./errorActions";

//Check Token and load user
export const loadUser = () => (dispatch, getState) => {
    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then((res) => {
            dispatch({ type: USER_LOADED, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: AUTH_ERROR });
        });
};

export const login = ({ email, password }) => (dispatch) => {
    const body = {
        email,
        password,
    };

    //Headers

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    axios
        .post("api/auth", body, config)
        .then((res) => {
            dispatch({ type: LOGIN_SUCESS, payload: res.data });
        })
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
            dispatch({ type: LOGIN_FAIL });
        });
};

export const register = ({ name, email, password }) => (dispatch) => {
    const body = {
        name,
        email,
        password,
    };

    //Headers

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    axios
        .post("/api/users", body, config)
        .then((res) => {
            dispatch({ type: REGISTER_SUCESS, payload: res.data });
        })
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
            dispatch({ type: REGISTER_FAIL });
        });
};

export const loadUserArticles = () => (dispatch, getState) => {
    axios
        .get("/api/articles/userArticles", tokenConfig(getState))
        .then((res) => {
            dispatch({ type: LOAD_USER_ARTICLES, payload: res.data });
        });
};

export const newUserArticle = ({ title, body, author, preview }) => (
    dispatch,
    getState
) => {
    const jsonBody = {
        title,
        body,
        author,
        preview,
    };

    axios
        .post("/api/articles/newArticle", jsonBody, tokenConfig(getState))
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {});
};

//Config Headers
export const tokenConfig = (getState) => {
    //Get token from local storage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS });
};

export const deleteArticle = (articleId) => (dispatch, getState) => {
    const id = {
        articleId,
    };

    axios
        .post("/api/articles/deleteArticle", id, tokenConfig(getState))
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {});
};

export const likeArticle = ({ articleId, name }) => (dispatch, getState) => {
    const id = {
        articleId,
        name,
    };

    axios
        .put("/api/articles/likeArticle", id, tokenConfig(getState))
        .then((res) => {})
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
        });
};

export const commentArticle = ({ articleId, commentBody, name }) => (
    dispatch,
    getState
) => {
    const article = getState().article.oneArticle;

    const comment = {
        articleId,
        commentBody,
        name,
    };
    axios
        .post("/api/articles/comment", comment, tokenConfig(getState))
        .then((res) => {
            window.location.reload();
        })
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
        });
};

export const deleteComment = ({ articleId, commentId, commentOwner }) => (
    dispatch,
    getState
) => {
    const comment = {
        articleId,
        commentId,
        commentOwner,
    };

    axios
        .put("/api/articles/deleteComment", comment, tokenConfig(getState))
        .then((res) => {})
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
        });
};
