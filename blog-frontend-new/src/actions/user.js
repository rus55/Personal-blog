import * as constants from '../constants';
import {apiUrls, backHost} from '../constants/apiUrls';
import axios from 'axios';

export default {
    resetUser(){
        return{
            type:constants.RESET_USER_ACTIONS,
        }
    },
    saveUserLoginValue(value) {
        return {
            type: constants.USER_INPUT_LOGIN_CHANGED,
            payload: value,
        };
    },
    saveUserPasswordValue(value) {
        return {
            type: constants.USER_INPUT_PASSWORD_CHANGED,
            payload: value,
        };
    },
    saveUserNameValue(value){
        return {
            type: constants.USER_INPUT_NAME_CHANGED,
            payload: value,
        };
    },
    saveUserSurnameValue(value){
        return {
            type: constants.USER_INPUT_SURNAME_CHANGED,
            payload: value,
        };
    },
    saveUserAboutValue(value){
        return {
            type: constants.USER_INPUT_ABOUT_CHANGED,
            payload: value,
        };
    },
    onLogin() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_LOG_IN,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.login,
                    {
                        email: store.user.userLogin,
                        password: store.user.userPassword,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.USER_LOG_IN_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.USER_LOG_IN_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    onLogout() {
        return {
            type: constants.USER_TRY_TO_LOG_OUT,
        };
    },
    deleteUser(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_DELETE,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.deleteUser,
                    {
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${store.user.userToken}`,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.USER_DELETE_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.USER_DELETE_FAILED,
                    payload: e.message,
                });
            }
        };
    },
    createUser(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_CREATE,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.registerUser,
                    {
                        email: store.user.userLogin,
                        password: store.user.userPassword,
                        name: store.user.userName,
                        surname: store.user.userSurname,
                        aboutMyself: store.user.userAbout,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.USER_CREATE_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.USER_CREATE_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    editUser(){
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.USER_TRY_TO_EDIT,
            });

            try {
                const response = await axios.post(
                    backHost + apiUrls.editUser,
                    {
                        password: store.user.userPassword,
                        name: store.user.userName,
                        surname: store.user.userSurname,
                        aboutMyself: store.user.userAbout,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${store.user.userToken}`,
                            'Content-Type': 'application/json',
                        }
                    });
                dispatch({
                    type: constants.USER_EDIT_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.USER_EDIT_FAIL,
                    payload: e.message,
                });
            }
        };
    },
    fetchUsers() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: constants.GET_USERS_LOADING,
            });

            try {
                const response = await axios.get(backHost + apiUrls.users, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                    }
                });
                dispatch({
                    type: constants.GET_USERS_SUCCESS,
                    payload: response.data
                })
            } catch (e) {
                dispatch({
                    type: constants.GET_USERS_FAIL,
                    payload: e.message,
                });
            }
        };
    }
}




