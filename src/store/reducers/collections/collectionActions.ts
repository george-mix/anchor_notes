import * as collectionActionsTypes from "./collectionActionTypes";

export const loadCollectionsRequested = () => ({
  type: collectionActionsTypes.LOAD_COLLECTIONS_REQUESTED,
});

export const createCollectionRequested = (name: string) => ({
  type: collectionActionsTypes.CREATE_COLLECTION_REQUESTED,
  payload: name,
});

export const deleteCollectionRequested = (id: number) => ({
  type: collectionActionsTypes.DELETE_COLLECTION_REQUESTED,
  payload: id,
});
