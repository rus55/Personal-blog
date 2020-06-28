import * as constants from '../constants';

const initialState = {
    userLogin: '', //email
    userPassword: '',
    userName: '',
    userSurname: '',
    userAbout:'',
    userToken: '', //временно. потом перенести в функцию логин
    userId: '',
    isAdmin: false,
    isLoggedIn: false,
    users: [],
    activeUser:{},
    isUsersLoading: false,
    isUserCreating: false,
    userCreateSuccess: false,
    isUserDeleting: false,
    userDeleteSuccess: false,
    isUserEditing:false,
    userEditSuccess:false,
    errMsg: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case constants.USER_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                userPassword: action.payload,
            };

        case constants.USER_INPUT_LOGIN_CHANGED:
            return {
                ...state,
                userLogin: action.payload,
            };
        case constants.USER_INPUT_NAME_CHANGED:
            return {
                ...state,
                userName: action.payload,
            };
        case constants.USER_INPUT_SURNAME_CHANGED:
            return {
                ...state,
                userSurname: action.payload,
            };
        case constants.USER_INPUT_ABOUT_CHANGED:
            return {
                ...state,
                userAbout: action.payload,
            };
        case constants.USER_TRY_TO_LOG_IN:
            const login = state.userLogin;
            return {
                ...state,
                isLoggedIn: true,
                errMsg:''
            };
        case constants.USER_LOG_IN_SUCCESS:
            return {
                ...state,
                activeUser: action.payload,
                isLoggedIn: true,
                userName:action.payload.name,
                userToken: action.payload.token,
                userId: action.payload.id,
                userAbout: action.payload.aboutMyself,
                userSurname: action.payload.surname,
                isAdmin: false,
                errMsg:''
            };
        case constants.USER_LOG_IN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                errMsg:action.payload,
                userToken: '',
                userId: '',
                isAdmin: false
            };
        case constants.USER_TRY_TO_DELETE:
            return {
                ...state,
                isUserDeleting: true,
                errMsg:''
            };
        case constants.USER_DELETE_FAILED:
            return {
                ...state,
                errMsg: action.payload,
                userDeleteSuccess: false,
                isUserDeleting: false,
            };
        case constants.USER_DELETE_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isUserDeleting: false,
                userDeleteSuccess: true,
                userLogin: '',
                isLoggedIn: false,
                isAdmin: false,
                userToken: '',
                userId: '',
                errMsg:''

            };

        case constants.USER_TRY_TO_EDIT:
            return {
                ...state,
                isUserEditing: true,
                errMsg:''
            };
        case constants.USER_EDIT_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                userEditSuccess: false,
                isUserEditing: false,
            };
        case constants.USER_EDIT_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isUserEditing: false,
                userEditSuccess: true,
                errMsg:'',
                activeUser: action.payload.find(user => user.id == state.userId ),
            };
        case constants.RESET_USER_ACTIONS:
            return {
                ...state,
                isUsersLoading: false,
                isUserCreating: false,
                userCreateSuccess: false,
                isUserDeleting: false,
                userDeleteSuccess: false,
                isUserEditing:false,
                userEditSuccess:false,
                errMsg: '',
            };
        case constants.USER_TRY_TO_CREATE:
            return {
                ...state,
                isUserCreating: true,
                userCreateSuccess: false,
                errMsg: '',
            };
        case constants.USER_CREATE_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                userCreateSuccess: false,
                isUserCreating: false,
            };
        case constants.USER_CREATE_SUCCESS:
            return {
                ...state,
                users: state.users.push(action.payload),
                isUserCreating: false,
                userCreateSuccess: true,
                errMsg:''
            };
        case constants.USER_TRY_TO_LOG_OUT:
            return {
                ...state,
                userLogin: '',
                isLoggedIn: false,
                isAdmin: false,
                userToken: '',
                userId: '',
                errMsg:''

            };

        case constants.GET_USERS_LOADING:
            return {
                ...state,
                isUsersLoading: true,
                errMsg:''
            };

        case constants.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isUsersLoading: false,
                errMsg:''
            };

        case constants.GET_USERS_FAIL:
            return {
                ...state,
                errMsg: action.payload,
                isUsersLoading: false,
            };

        default:
            return state;
    }
}
