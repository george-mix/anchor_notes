import { AnyAction } from "redux";

import * as actionTypes from "./collectionActionsTypes";

const initialCollectionState = {
  loading: false,
  error: "",
  data: [],
};

export default function collectionReducer(
  state = initialCollectionState,
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.LOAD_COLLECTIONS_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.LOAD_COLLECTIONS_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case actionTypes.LOAD_COLLECTIONS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.CREATE_COLLECTION_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case actionTypes.CREATE_COLLECTION_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case actionTypes.CREATE_COLLECTION_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
