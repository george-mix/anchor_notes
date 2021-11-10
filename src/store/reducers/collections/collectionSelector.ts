import CollectionModel from "../../../database/models/Collection";
import { RootState } from "../rootReducer";

type TCollectionState = {
  loading: boolean;
  error: string;
  data: CollectionModel[];
};

export const selectCollections = (state: RootState): TCollectionState =>
  state.collections;
