import { createInstance } from "../../component/request";
import { createActionType } from "../helper";

// Ducks pattern

const state = "auth";

const LOGIN = createActionType(state, "LOGIN");
const LOGOUT = createActionType(state, "LOGOUT");
const CHECK = createActionType(state, "CHECK");

const initialState = {
    loading: false,
    isLoggedIn: false,
    token: undefined,
    user: undefined,
    errorCode: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        // LOGIN
        case LOGIN.START:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case LOGIN.SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.token,
                user: action.user
            };
        case LOGIN.FAIL:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };

        // LOGOUT
        case LOGOUT.START:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case LOGOUT.SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                token: undefined,
                user: undefined
            };
        case LOGOUT.FAIL:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };

        // CHECK
        case CHECK.START:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case CHECK.SUCCESS:
            return {
                ...state,
                loading: false
            }
        case CHECK.FAIL:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                token: undefined,
                user: undefined,
                errorCode: action.code
            }

        default:
            return state;
    }
}

export const login = data => async dispatch => {
    dispatch({ type: LOGIN.START });

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
        type: LOGIN.SUCCESS,
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
        type: LOGIN.FAIL,
        code: errorCode
    }
}

export const logout = token => async dispatch => {
    dispatch({ type: LOGOUT.START });

    try {

        const instance = createInstance(token);

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
        type: LOGOUT.SUCCESS
    }
}

const logoutFail = error => {
    let errorCode = '';

    // axios request timeout
    if (error.code === 'ECONNABORTED') errorCode = error.code
    else errorCode = error.response.status;

    return {
        type: LOGOUT.FAIL,
        code: errorCode
    }
}

export const check = token => async dispatch => {
    dispatch({ type: CHECK.START });

    try {
        const instance = createInstance(token);

        await instance.post('/auth/check/');

        dispatch(checkSuccess());

        return true;
    }

    catch (error) {
        dispatch(checkFail(error));

        return false;
    }
}

const checkSuccess = () => {
    return {
        type: CHECK.SUCCESS
    }
}

const checkFail = error => {
    let errorCode = '';

    // axios request timeout
    if (error.code === 'ECONNABORTED') errorCode = error.code
    else errorCode = error.response.status;

    return {
        type: CHECK.FAIL,
        code: errorCode
    }
}
