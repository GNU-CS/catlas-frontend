import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./modules";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const persistor = persistStore(store);

export { store, persistor };