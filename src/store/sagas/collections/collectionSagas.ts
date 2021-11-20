import { call, put, takeEvery } from "redux-saga/effects";

import {
  createCollection,
  deleteCollection,
  getAll,
} from "../../../database/controllers/CollectionController";
import CollectionModel from "../../../database/models/Collection";
import * as actionTypes from "../../reducers/collections/collectionActionTypes";

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

function* deleteCollectionAction({
  payload,
}: {
  type: typeof actionTypes.DELETE_COLLECTION_REQUESTED;
  payload: number;
}) {
  try {
    const collections: CollectionModel[] = yield call(deleteCollection, {
      id: payload,
    });
    yield put({
      type: actionTypes.DELETE_COLLECTION_SUCCEEDED,
      payload: collections,
    });
  } catch (error) {
    yield put({ type: actionTypes.DELETE_COLLECTION_FAILED, payload: error });
  }
}

export default function* collectionSaga() {
  yield takeEvery(actionTypes.LOAD_COLLECTIONS_REQUESTED, getCollectionsAction);
  yield takeEvery(
    actionTypes.CREATE_COLLECTION_REQUESTED,
    createCollectionAction
  );
  yield takeEvery(
    actionTypes.DELETE_COLLECTION_REQUESTED,
    deleteCollectionAction
  );
}
