import { createInstance } from "../../component/request";

// Ducks pattern

const WRITE = "catlas/post/WRITE";
const WRITE_SUCCEEDED = "catlas/post/WRITE_SUCCEEDED";
const WRITE_FAILED = "catlas/post/WRITE_FAILED";

const initialState = {
    loading: false,
    errorCode: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case WRITE:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case WRITE_SUCCEEDED:
            return {
                ...state,
                loading: false
            };
        case WRITE_FAILED:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        default:
            return state;
    }
}

export const write = (data, token) => async dispatch => {
    dispatch({ type: WRITE });

    try {
        const instance = createInstance(token);

        await instance.post('post/write/', data);

        dispatch(writeSuccess());

        return true;

    } catch (error) {
        dispatch(writeFail(error));

        return false;
    }
}

const writeSuccess = () => {
    return {
        type: WRITE_SUCCEEDED
    }
}

const writeFail = error => {
    let code = '';

    if (error.code === 'ECONNABORTED') code = error.code; // axios request timeout
    else code = error.response.status;

    return {
        type: WRITE_FAILED,
        code: code
    }
}