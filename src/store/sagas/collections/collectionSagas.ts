import { call, put, takeEvery } from "redux-saga/effects";

import { getAll } from "../../../database/controllers/CollectionController";
import CollectionModel from "../../../database/models/Collection";
import { LOAD_COLLECTIONS_REQUESTED } from "../../reducers/collections/collectionActions";

function* getCollectionsAction() {
  try {
    const collections: CollectionModel[] = yield call(getAll);
    yield put({ type: "LOAD_COLLECTIONS_SUCCEEDED", payload: collections });
  } catch (error) {
    yield put({ type: "LOAD_COLLECTIONS_FAILED", payload: error });
  }
}

export default function* collectionSaga() {
  yield takeEvery(LOAD_COLLECTIONS_REQUESTED, getCollectionsAction);
}
