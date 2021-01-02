import axios from "axios";

// Ducks pattern

const LOGIN_SUCCEEDED = "catlas/auth/LOGIN_SUCCESS";
const LOGIN_FAILED = "catlas/auth/LOGIN_FAILED";
const LOGOUT = "catlas/auth/LOGOUT";

const initialState = {
    isLoggedIn: false,
    token: ""
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCEEDED:
            const userToken = action.token;

            return {
                ...state,
                isLoggedIn: true,
                token: userToken
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: ""
            }
        default:
            return state;
    }
}

export const LoginSuccess = token => {
    return {
        type: LOGIN_SUCCEEDED,
        token: token
    }
}

export const LoginFailed = () => {
    return {
        type: LOGIN_FAILED
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
        
    }
};