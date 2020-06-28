import * as constants from '../constants'

const initialState = {
    likesCount: {},
    userLikes: {},
    errMsg: '',

};

export default function likeReducer(state = initialState, action) {
    switch (action.type) {
        case constants.LIKE_CREATE_FAILED:
            return {
                ...state,
                errMsg: action.payload,
            };
        case constants.LIKE_CREATE_SUCCESS:
            return {
                ...state,
                likesCount: action.payload,
            };
        case constants.LIKE_DELETE_FAILED:
            return {
                ...state,
                errMsg: action.payload,
            };
        case constants.LIKE_DELETE_SUCCESS:
            return {
                ...state,
                likesCount: action.payload,
            };
        case constants.GET_LIKES_COUNT_SUCCESS:
            return {
                ...state,
                likesCount: action.payload,
            };
        case constants.GET_LIKES_COUNT_FAIL:
            return {
                ...state,
                errMsg: action.payload,
            };
        case constants.GET_LIKES_SUCCESS:
            return {
                ...state,
                userLikes: action.payload,
            };
        case constants.GET_LIKES_FAIL:
            return {
                ...state,
                errMsg: action.payload,
            };
        default:
            return state;
    }
}