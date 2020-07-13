import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

export const getErrors = (message, status) => (dispatch) => {
    dispatch({ type: GET_ERRORS, payload: { message, status } });
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
