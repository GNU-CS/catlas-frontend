import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./modules";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export const persistor = persistStore(store);

export default { store, persistor };