import { AnyAction } from "redux";

import {
  LOAD_COLLECTIONS_FAILED,
  LOAD_COLLECTIONS_REQUESTED,
  LOAD_COLLECTIONS_SUCCEEDED,
} from "./collectionActions";

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
    case LOAD_COLLECTIONS_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOAD_COLLECTIONS_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case LOAD_COLLECTIONS_FAILED: {
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
