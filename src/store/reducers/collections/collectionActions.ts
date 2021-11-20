import * as collectionActionsTypes from "./collectionActionsTypes";

export const loadCollectionsRequested = () => ({
  type: collectionActionsTypes.LOAD_COLLECTIONS_REQUESTED,
});

export const createCollectionRequested = (name: string) => ({
  type: collectionActionsTypes.CREATE_COLLECTION_REQUESTED,
  payload: name,
});
