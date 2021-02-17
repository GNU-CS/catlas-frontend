import { createInstance } from "../../component/request";

// Ducks pattern

const POST = "catlas/upload/POST";
const POST_SUCCEEDED = "catlas/upload/POST_SUCCEEDED";
const POST_FAILED = "catlas/upload/POST_FAILED";

const initialState = {
    loading: false,
    errorCode: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case POST_SUCCEEDED:
            return {
                ...state,
                loading: false
            };
        case POST_FAILED:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        default:
            return state;
    }
}

export const post = (data, token) => async dispatch => {
    dispatch({ type: POST });

    try {
        const instance = createInstance(token);

        await instance.post('post/write/', data);

        dispatch(postSuccess());

        return true;

    } catch (error) {
        dispatch(postFail(error));

        return false;
    }
}

const postSuccess = () => {
    return {
        type: POST_SUCCEEDED
    }
}

const postFail = error => {
    let code = '';

    if (error.code === 'ECONNABORTED') code = error.code; // axios request timeout
    else code = error.response.status;

    return {
        type: POST_FAILED,
        code: code
    }
}