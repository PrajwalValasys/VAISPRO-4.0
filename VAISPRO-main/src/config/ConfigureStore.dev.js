import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../context/reducers";
import { routerMiddleware } from "react-router-redux";

export default (history) => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
