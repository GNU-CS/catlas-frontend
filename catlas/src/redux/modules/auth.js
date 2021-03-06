import { createInstance } from "../../component/request";

// Ducks pattern

const LOGIN = "catlas/auth/LOGIN";
const LOGIN_SUCCEEDED = "catlas/auth/LOGIN_SUCCESS";
const LOGIN_FAILED = "catlas/auth/LOGIN_FAILED";

const LOGOUT = "catlas/auth/LOGOUT";
const LOGOUT_SUCCEEDED = "catlas/auth/LOGOUT_SUCCESS";
const LOGOUT_FAILED = "catlas/auth/LOGOUT_FAILED";

const initialState = {
    loading: false,
    isLoggedIn: false,
    token: '',
    user: undefined,
    errorCode: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                user: action.user,
                token: action.token
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        case LOGOUT:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                user: undefined,
                token: ''
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        default:
            return state;
    }
}

export const login = data => async dispatch => {
    dispatch({ type: LOGIN });

    try {
        const instance = createInstance();

        const response = await instance.post('/auth/login/', data);

        dispatch(loginSuccess(response.data));

        return true;

    } catch (error) {
        dispatch(loginFail(error));

        return false;
    }
}

const loginSuccess = data => {
    return {
        type: LOGIN_SUCCEEDED,
        token: data.token,
        user: data.user
    }
}

const loginFail = error => {
    let errorCode = '';
    
    // axios request timeout
    if (error.code === 'ECONNABORTED') errorCode = error.code
    else errorCode = error.response.status;

    return {
        type: LOGIN_FAILED,
        code: errorCode
    }
}

export const logout = token => async dispatch => {
    dispatch({ type: LOGOUT });

    try {

        const instance = createInstance();

        instance.defaults.headers.common['Authorization'] = 'token ' + token;

        await instance.post('/auth/logout/');

        dispatch(logoutSuccess());

        return true;

    } catch (error) {
        dispatch(logoutFail(error));

        return false;
    }
}

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCEEDED
    }
}

const logoutFail = error => {
    let errorCode = '';
    
    // axios request timeout
    if (error.code === 'ECONNABORTED') errorCode = error.code
    else errorCode = error.response.status;

    return {
        type: LOGOUT_FAILED,
        code: errorCode
    }
}