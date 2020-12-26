// Ducks pattern

const LOGIN = "catlas/auth/LOGIN";
const LOGOUT = "catlas/auth/LOGOUT";

const initialState = {
    isLoggedIn: false,
    token: ""
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
    case LOGIN:
        return {
            ...state,
            isLoggedIn: !(state.isLoggedIn),
            token: action.token
        }
    case LOGOUT:
        return {
            ...state,
            isLoggedIn: !(state.isLoggedIn),
            token: ""
        }
    default:
        return state;
    }
}

export const loginAction = (payload) => {
    return {
        type: LOGIN,
        payload
    };
};

export const logoutAction = (payload) => {
    return {
        type: LOGOUT,
        payload
    };
};