import { createStore, applyMiddleware, compose } from "redux";

// Logger with default options
import logger from "redux-logger";

import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(logger), composeWithDevTools())
  );
  return store;
}
