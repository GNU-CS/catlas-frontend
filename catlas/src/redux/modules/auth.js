import axios from "axios";

// Implement WAITING status

// Ducks pattern

const LOGIN = "catlas/auth/LOGIN";
const LOGIN_SUCCEEDED = "catlas/auth/LOGIN_SUCCESS";
const LOGIN_FAILED = "catlas/auth/LOGIN_FAILED";

const LOGOUT_SUCCEEDED = "catlas/auth/LOGOUT_SUCCESS";
const LOGOUT_FAILED = "catlas/auth/LOGOUT_FAILED";

const initialState = {
    loading: false,
    isLoggedIn: false,
    token: "",
    detail: ""
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
                isLoggedIn: false,
                error: false,
            }
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                error: false,
                token: action.token
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                error: true,
            }
        case LOGOUT_SUCCEEDED:
            return {
                ...state,
                isLoggedIn: false,
                token: ""
            }
        case LOGOUT_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export const login = data => async dispatch => {
    dispatch({ type: LOGIN });

    try {
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 1000,
        });

        const response = await instance.post('/auth/login/', data);

        dispatch(LoginSuccess(response.data.token));

        return true;

    } catch (error) {
        dispatch(LoginFailed());

        return false;
    }
}

// rewrite in async/await
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

const LoginSuccess = token => {
    return {
        type: LOGIN_SUCCEEDED,
        token: token
    }
}

const LoginFailed = detail => {
    return {
        type: LOGIN_FAILED,
        detail: detail
    }
}

const LogoutSuccess = () => {
    return {
        type: LOGOUT_SUCCEEDED
    }
}

const LogoutFailed = () => {
    return {
        type: LOGOUT_FAILED
    }
}