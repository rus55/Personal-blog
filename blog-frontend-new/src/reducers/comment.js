import * as constants from '../constants'

const initialState = {
    comments: [],
    commentsCount: {},
    isCommentsLoading: false,
    commentText: '',
    isCommentCreating: false,
    commentCreateSuccess: false,
    isCommentDeleting: false,
    commentDeleteSuccess: false,
    isCommentEditing: false,
    commentEditSuccess: false,
    isCommentsCountLoading:false,
    errMsg: '',

};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case constants.COMMENT_INPUT_TEXT_CHANGED:
            return {
                ...state,
                commentText: action.payload,
            };
        case constants.COMMENT_RESET_ACTIONS:
            return {
                ...state,
                isCommentsLoading: false,
                isCommentCreating: false,
                commentCreateSuccess: false,
                isCommentDeleting: false,
                commentDeleteSuccess: false,
                isCommentEditing: false,
                commentEditSuccess: false,
                isCommentsCountLoading:false,
                errMsg: '',
            }
        case constants.COMMENT_TRY_TO_CREATE:
            return {
                ...state,
                isCommentCreating: true,
                commentCreateSuccess: false,
                errMsg: '',
            };
        case constants.COMMENT_CREATE_FAILED:
            return {
                ...state,
                errMsg: action.payload,
                commentCreateSuccess: false,
                isCommentCreating: false,
            };
        case constants.COMMENT_CREATE_SUCCESS:
            return {
                ...state,
                isCommentCreating: false,
                commentCreateSuccess: true
            };
        case constants.COMMENT_TRY_TO_DELETE:
            return {
                ...state,
                isCommentDeleting: true,
                commentDeleteSuccess: false,
                errMsg: '',
            };
        case constants.COMMENT_DELETE_FAILED:
            return {
                ...state,
                errMsg: action.payload,
                commentDeleteSuccess: false,
                isCommentDeleting: false,
            };
        case constants.COMMENT_DELETE_SUCCESS:
            return {
                ...state,
                isCommentDeleting: false,
                commentDeleteSuccess: true
            };
        case constants.COMMENT_TRY_TO_EDIT:
            return {
                ...state,
                isCommentEditing: true,
                commentEditSuccess: false,
                errMsg: '',
            };
        case constants.COMMENT_EDIT_FAILED:
            return {
                ...state,
                errMsg: action.payload,
                commentEditSuccess: false,
                isCommentEditing: false,
            };
        case constants.COMMENT_EDIT_SUCCESS:
            return {
                ...state,
                isCommentEditing: false,
                commentEditSuccess: true
            };
        case constants.GET_COMMENTS_LOADING:
            return {
                ...state,
                isCommentsLoading: true,
            };

        case constants.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload,
                isCommentsLoading: false,
            };

        case constants.GET_COMMENTS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isCommentsLoading: false,
            };
        case constants.GET_COMMENTS_COUNT_LOADING:
            return {
                ...state,
                isCommentsCountLoading: true,
            };
        case constants.GET_COMMENTS_COUNT_SUCCESS:
            return {
                ...state,
                commentsCount: action.payload,
                isCommentsCountLoading: false,
            };
        case constants.GET_COMMENTS_COUNT_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isCommentsCountLoading: false,
            };
        case constants.COMMENT_COUNT_PLUS:
            return {
                ...state,
                commentsCount: action.payload,
            }
        default:
            return state;
    }
}