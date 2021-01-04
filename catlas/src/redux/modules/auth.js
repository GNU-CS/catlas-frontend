import axios from "axios";

// Ducks pattern

const LOGIN_SUCCEEDED = "catlas/auth/LOGIN_SUCCESS";
const LOGIN_FAILED = "catlas/auth/LOGIN_FAILED";
const LOGOUT_SUCCEEDED = "catlas/auth/LOGOUT_SUCCESS";
const LOGOUT_FAILED = "catlas/auth/LOGOUT_FAILED";

const initialState = {
    isLoggedIn: false,
    token: ""
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                isLoggedIn: false,
                token: ""
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                detail: action.detail
            }
        default:
            return state;
    }
}

const LoginSuccess = token => {
    return {
        type: LOGIN_SUCCEEDED,
        token: token
    }
}

const LoginFailed = () => {
    return {
        type: LOGIN_FAILED
    }
}

const LogoutSuccess = () => {
    return {
        type: LOGOUT_SUCCEEDED
    }
}

const LogoutFailed = detail => {
    return {
        type: LOGOUT_FAILED,
        detail: detail
    }
}

export const loginAction = data => {
    return function(dispatch) {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 1000,
        });

        return instance.post('/auth/login/', data)
        .then(response => {
            return dispatch(LoginSuccess(response.data.token));
        })
        .catch(error => {
            return dispatch(LoginFailed());
        });
    }
};

export const logoutAction = token => {
    return function(dispatch) {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 1000,
            headers: {
                'Authorization': 'token ' + token
            }
        });

        return instance.post('/auth/logout/')
        .then(response => {
            return dispatch(LogoutSuccess());
        })
        .catch(error => {
            return dispatch(LogoutFailed(error.detail));
        });
    }
};