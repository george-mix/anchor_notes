import { combineReducers } from "redux";

import collectionReducer from "./collections/collectionReducer";

const rootReducer = combineReducers({
  collections: collectionReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
