import { createInstance } from "../../component/request";

// Ducks pattern

const REGISTER = "catlas/register/REGISTER";
const REGISTER_SUCCEEDED = "catlas/register/REGISTER_SUCCEEDED";
const REGISTER_FAILED = "catlas/register/REGISTER_FAILED";

const initialState = {
    loading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCEEDED:
            return {
                ...state,
                loading: false
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false
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
    console.log(error);

    return {
        type: REGISTER_FAILED
    }
}