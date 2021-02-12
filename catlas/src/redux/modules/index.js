import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import register from "./register";
import post from "./post";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth", "register", "post"]
};

const rootReducer = combineReducers({ auth, register, post });

export default persistReducer(persistConfig, rootReducer);