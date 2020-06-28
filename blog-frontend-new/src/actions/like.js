import * as constants from '../constants';
import {apiUrls, backHost} from '../constants/apiUrls';
import axios from 'axios';

export default {
    deleteLike(value){
        return async (dispatch, getStore) => {
            const store = getStore();
            try {
                const response = await axios.post(
                    backHost + apiUrls.deleteLike,
                    {
                        'postId' : value
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer '+  store.user.userToken,
                            'Content-Type': 'application/json',
                        }
                    });
                let likesCount = store.like.likesCount;
                likesCount[value]--;
                dispatch({
                    type: constants.LIKE_CREATE_SUCCESS,
                    payload: likesCount
                });
                let likes = store.like.userLikes;
                likes[value]=false;
                dispatch({
                    type: constants.GET_LIKES_SUCCESS,
                    payload: likes
                })
            } catch (e) {
                dispatch({
                    type: constants.LIKE_CREATE_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    addLike(value) {
        return async (dispatch, getStore) => {
            const store = getStore();
            try {
                const response = await axios.post(
                    backHost + apiUrls.addLike,
                    {
                        'postId' : value
                    },
                    {
                        headers: {
                            'Authorization' : 'Bearer '+  store.user.userToken,
                            'Content-Type': 'application/json',
                        }
                    });
                let likesCount = store.like.likesCount;
                likesCount[value]++;
                dispatch({
                    type: constants.LIKE_CREATE_SUCCESS,
                    payload: likesCount
                });
                let likes = store.like.userLikes;
                likes[value]=true;
                dispatch({
                    type: constants.GET_LIKES_SUCCESS,
                    payload: likes
                })

            } catch (e) {
                dispatch({
                    type: constants.LIKE_CREATE_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    fetchLikesCount(){
        return async (dispatch, getStore) => {
            const store = getStore();

            try {
                const response = await axios.get(
                    backHost + apiUrls.likesCount,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.GET_LIKES_COUNT_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_LIKES_COUNT_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    fetchLikes(){
        return async (dispatch, getStore) => {
            const store = getStore();
            try {
                const response = await axios.get(
                    backHost + apiUrls.likes,
                    {
                        headers: {
                            'Authorization' : 'Bearer '+  store.user.userToken,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.GET_LIKES_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_LIKES_FAIL,
                    payload: e.message,
                });
            }
        };
    }
}