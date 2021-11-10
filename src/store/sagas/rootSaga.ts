import { all, spawn } from "redux-saga/effects";

import collectionSaga from "./collections/collectionSagas";

export default function* rootSaga() {
  const sagas = [collectionSaga];

  yield all(sagas.map((saga) => spawn(saga)));
}
