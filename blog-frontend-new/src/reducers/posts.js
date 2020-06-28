import * as constants from '../constants'

const initialState = {
    posts: [],
    searchPosts:[],
    isPostsLoading: false,
    isPostsSearching: false,
    newPostTitle: '',
    newPostText: '',
    searchString:'',
    isPostCreating: false,
    postCreateSuccess: false,
    isPostDeleting: false,
    postDeleteSuccess: false,
    isPostEditing: false,
    postEditSuccess: false,
    errMsg: '',

};

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case constants.GET_POSTS_LOADING:
            return {
                ...state,
                isPostsLoading: true,
            };

        case constants.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostsLoading: false,
            };

        case constants.GET_POSTS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isPostsLoading: false,
            };
        case constants.GET_POSTS_SEARCHING:
            return {
                ...state,
                isPostsSearching: true,
            };

        case constants.GET_POSTS_SEARCH_SUCCESS:
            return {
                ...state,
                searchPosts: action.payload,
                isPostsSearching: false,
            };

        case constants.GET_POSTS_SEARCH_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isPostsSearching: false,
            };
        case constants.POST_SEARCH_INPUT_CHANGED:
            return {
                ...state,
                searchString: action.payload,
            };
        case constants.POST_INPUT_TITLE_CHANGED:
            return {
                ...state,
                newPostTitle: action.payload,

            };
        case constants.POST_INPUT_TEXT_CHANGED:
            return {
                ...state,
                newPostText: action.payload,

            };
        case constants.POST_TRY_TO_CREATE:
            return {
                ...state,
                isPostCreating: true,
                postCreateSuccess: false,
                errMsg: '',
            };
        case constants.POST_CREATE_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                postCreateSuccess: false,
                isPostCreating: false,
            };
        case constants.POST_CREATE_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostCreating: false,
                postCreateSuccess: true
            };
        case constants.POST_TRY_TO_DELETE:
            return {
                ...state,
                isPostDeleting: true,
                postDeleteSuccess: false,
                errMsg: '',
            };
        case constants.POST_DELETE_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                postDeleteSuccess: false,
                isPostDeleting: false,
            };
        case constants.POST_DELETE_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostDeleting: false,
                postDeleteSuccess: true
            };
        case constants.POST_TRY_TO_EDIT:
            return {
                ...state,
                isPostEditing: true,
                postEditSuccess: false,
                errMsg: '',
            };
        case constants.POST_EDIT_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                postEditSuccess: false,
                isPostEditing: false,
            };
        case constants.POST_EDIT_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                isPostEditing: false,
                postEditSuccess: true
            };
        case constants.POST_LIST_RESET:
            return {
                ...state,
                sPostCreating: false,
                postCreateSuccess: false,
                isPostDeleting: false,
                postDeleteSuccess: false,
                isPostEditing: false,
                postEditSuccess: false,
                errMsg: '',

            };

        default:
            return state;
    }
}