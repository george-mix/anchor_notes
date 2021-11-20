import { call, put, takeEvery } from "redux-saga/effects";

import {
  createCollection,
  getAll,
} from "../../../database/controllers/CollectionController";
import CollectionModel from "../../../database/models/Collection";
import * as actionTypes from "../../reducers/collections/collectionActionsTypes";

function* getCollectionsAction() {
  try {
    const collections: CollectionModel[] = yield call(getAll);
    yield put({
      type: actionTypes.LOAD_COLLECTIONS_SUCCEEDED,
      payload: collections,
    });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_COLLECTIONS_FAILED, payload: error });
  }
}

function* createCollectionAction({
  payload,
}: {
  type: typeof actionTypes.CREATE_COLLECTION_REQUESTED;
  payload: string;
}) {
  try {
    const collections: CollectionModel[] = yield call(createCollection, {
      name: payload,
    });
    yield put({
      type: actionTypes.CREATE_COLLECTION_SUCCEEDED,
      payload: collections,
    });
  } catch (error) {
    yield put({ type: actionTypes.CREATE_COLLECTION_FAILED, payload: error });
  }
}

export default function* collectionSaga() {
  yield takeEvery(actionTypes.LOAD_COLLECTIONS_REQUESTED, getCollectionsAction);
  yield takeEvery(
    actionTypes.CREATE_COLLECTION_REQUESTED,
    createCollectionAction
  );
}
