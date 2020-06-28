import * as constants from '../constants';
import {apiUrls, backHost} from '../constants/apiUrls';
import axios from 'axios';

export default {
    saveCommentTextValue(value){
        return {
            type: constants.COMMENT_INPUT_TEXT_CHANGED,
            payload: value,
        };
    },
    resetComment(){
        return {
            type: constants.COMMENT_RESET_ACTIONS
        }
    },
    createComment(value) {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.COMMENT_TRY_TO_CREATE,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.addComment,
                    {
                        text: store.comment.commentText,
                        postId: value,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${store.user.userToken}`,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.COMMENT_CREATE_SUCCESS,
                    payload: response.data
                });
                let commentsCount = store.comment.commentsCount;
                commentsCount[value]++;
                dispatch({
                    type: constants.COMMENT_COUNT_PLUS,
                    payload: commentsCount
                })
            } catch (e) {
                dispatch({
                    type: constants.COMMENT_CREATE_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    deleteComment(commentId,postId){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.COMMENT_TRY_TO_DELETE,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.deleteComment,
                    {
                        commentId: commentId,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${store.user.userToken}`,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.COMMENT_DELETE_SUCCESS,
                    payload: response.data
                });
                let commentsCount = store.comment.commentsCount;
                commentsCount[postId]--;
                dispatch({
                    type: constants.COMMENT_COUNT_PLUS,
                    payload: commentsCount
                })
            } catch (e) {
                dispatch({
                    type: constants.COMMENT_DELETE_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    editComment(value){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.COMMENT_TRY_TO_EDIT,
            });

        try {
            const response = await axios.post(
                backHost + apiUrls.editComment,
                {
                    commentId: value,
                    text: store.comment.commentText,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${store.user.userToken}`,
                        'Content-Type': 'application/json',
                    }
                });
            dispatch({
                type: constants.COMMENT_EDIT_SUCCESS,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: constants.COMMENT_EDIT_FAILED,
                payload: e.message,
            });
        }
    };
    },
    fetchComments(value){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_COMMENTS_LOADING,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.comments,
                    {
                        'postId': value
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.GET_COMMENTS_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_COMMENTS_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    fetchCommentCount(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_COMMENTS_COUNT_LOADING,
            });

            try {
                const response = await axios.get(
                    backHost + apiUrls.commentsCount,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.GET_COMMENTS_COUNT_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_COMMENTS_COUNT_FAIL,
                    payload: e.message,
                });
            }
        };
    }

}