import { createInstance } from "../../component/request";
import { createActionType } from "../helper";

// Ducks pattern

const state = "post";

const LIST = createActionType(state, "LIST");
const WRITE = createActionType(state, "WRITE");

const initialState = {
    loading: false,
    errorCode: '',
    list: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LIST.START:
            return {
                ...state,
                loading: true,
                errorCode: '',
                list: []
            };
        case LIST.SUCCESS:
            return {
                ...state,
                loading: false,
                list: action.list
            };
        case LIST.FAIL:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        case WRITE.START:
            return {
                ...state,
                loading: true,
                errorCode: ''
            };
        case WRITE.SUCCESS:
            return {
                ...state,
                loading: false
            };
        case WRITE.FAIL:
            return {
                ...state,
                loading: false,
                errorCode: action.code
            };
        default:
            return state;
    }
}

export const list = () => async dispatch => {
    dispatch({ type: LIST.START });

    try {
        const instance = createInstance();

        const response = await instance.get('post/');

        dispatch(listSuccess(response.data));

        return true;
    } catch (error) {
        dispatch(listFail(error));

        return false;
    }
}

const listSuccess = data => {
    return {
        type: LIST.SUCCESS,
        list: data
    }
}

const listFail = error => {
    let code = '';

    if (error.code === 'ECONNABORTED') code = error.code; // axios request timeout
    else code = error.response.status;

    return {
        type: LIST.FAIL,
        code: code
    }
}

export const write = (data, token) => async dispatch => {
    dispatch({ type: WRITE.START });

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
        type: WRITE.SUCCESS
    }
}

const writeFail = error => {
    let code = '';

    if (error.code === 'ECONNABORTED') code = error.code; // axios request timeout
    else code = error.response.status;

    return {
        type: WRITE.FAIL,
        code: code
    }
}