import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import rootReducer from "./reducer/index";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga/root";
const sagaMiddleware = createSagaMiddleware();

const persistedState = localStorage.getItem("primeCoachStore")
  ? JSON.parse(localStorage.getItem("primeCoachStore"))
  : {};
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
// currently removed logger

sagaMiddleware.run(rootSaga);
store.subscribe(() => {
  // console.log("*** Subscripbe Store=>", store.getState());
  localStorage.setItem("primeCoachStore", JSON.stringify(store.getState()));
});

export default store;
