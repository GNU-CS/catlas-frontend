import { createInstance } from "../../component/request";

// Ducks pattern

const REGISTER = "catlas/register/REGISTER";
const REGISTER_SUCCEEDED = "catlas/register/REGISTER_SUCCEEDED";
const REGISTER_FAILED = "catlas/register/REGISTER_FAILED";

const initialState = {
    loading: false,
    errorCode: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case REGISTER_SUCCEEDED:
            return {
                ...state,
                loading: false
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        default:
            return state;
    }
}

export const register = data => async dispatch => {
    dispatch({ type: REGISTER });

    try {
        const instance = createInstance();

        await instance.post('auth/register/', data);

        dispatch(registerSuccess());

        return true;

    } catch (error) {
        dispatch(registerFail(error));

        return false;
    }
}

const registerSuccess = () => {
    return {
        type: REGISTER_SUCCEEDED
    }
}

const registerFail = error => {
    let errorCode = '';
    
    // axios request timeout
    if (error.code === 'ECONNABORTED') errorCode = error.code
    else errorCode = error.response.status;

    return {
        type: REGISTER_FAILED,
        code: errorCode
    }
}