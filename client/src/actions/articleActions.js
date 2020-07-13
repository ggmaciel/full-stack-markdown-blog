import { LOAD_ARTICLE } from "../actions/types";
import { getErrors } from "./errorActions";
import { clearErrors } from "./errorActions";

import axios from "axios";

export const loadArticle = (articleId) => (dispatch, getState) => {
    const id = {
        articleId,
    };

    axios
        .post("/api/articles/article", id)
        .then((res) => {
            dispatch({ type: LOAD_ARTICLE, payload: res.data });
        })
        .then(() => {
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status));
        });
};
