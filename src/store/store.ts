import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";

import rootSaga from "./sagas/rootSaga";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
