import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth";
import register from "./register";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth", "register"]
};

const rootReducer = combineReducers({ auth, register });

export default persistReducer(persistConfig, rootReducer);