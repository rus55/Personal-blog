import * as constants from '../constants';
import {apiUrls, backHost} from '../constants/apiUrls';
import axios from 'axios';

export default {
    fetchPosts() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_POSTS_LOADING,
            });

            try {
                const response = await axios.get(
                    backHost + apiUrls.posts,
                    {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json',
                        }
            });
                dispatch({
                    type: constants.GET_POSTS_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POSTS_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    search() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_POSTS_SEARCHING,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.search,
                    {
                        'search': store.posts.searchString
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.GET_POSTS_SEARCH_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_POSTS_SEARCH_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    savePostTitleInputValue(value) {
        return {
            type: constants.POST_INPUT_TITLE_CHANGED,
            payload: value,
        };
    },
    savePostTextInputValue(value) {
        return {
            type: constants.POST_INPUT_TEXT_CHANGED,
            payload: value,
        };
    },
    saveSearchInputValue(value){
        return {
            type: constants.POST_SEARCH_INPUT_CHANGED,
            payload: value,
        };
    },
    reset(){
        return {
            type: constants.POST_LIST_RESET,
        };
    },
    deletePost(value) {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.POST_TRY_TO_DELETE,
            });

            console.log('value in deletePost', value);
            try {
                const response = await axios.post(
                    backHost + apiUrls.deletePost,
                    {
                        'postId': value
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${store.user.userToken}`,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.POST_DELETE_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.POST_DELETE_FAIL,
                    payload: e.message,
                });
            }
        }
    },
    editPost(value){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.POST_TRY_TO_EDIT,
            });
            console.log('store in editPost', store);
            try {

                const response = await axios.post(
                    backHost + apiUrls.editPost,
                    {
                        'title' : store.posts.newPostTitle,
                        'text' : store.posts.newPostText,
                        'postId' : value
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer '+  store.user.userToken,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.POST_EDIT_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.POST_EDIT_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    createPost(value) {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.POST_TRY_TO_CREATE,
            });
            try {

                const response = await axios.post(
                    backHost + apiUrls.addPost,
                    {
                        'title' : store.posts.newPostTitle,
                        'text' : store.posts.newPostText,
                        'token' : store.user.userToken
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer '+  store.user.userToken,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.POST_CREATE_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.POST_CREATE_FAIL,
                    payload: e.message,
                });
            }
        };
    },
}




