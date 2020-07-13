import { LOAD_ARTICLE } from "../actions/types";

const initialState = {
    oneArticle: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ARTICLE:
            return {
                oneArticle: action.payload,
            };
        default:
            return state;
    }
}
