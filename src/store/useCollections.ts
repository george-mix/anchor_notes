import create from "zustand";

import { getAll } from "../database/controllers/CollectionController";
import CollectionModel from "../database/models/Collection";

interface CollectionState {
  collections: CollectionModel[];
  getAll: () => Promise<void>;
}

const useCollections = create<CollectionState>((set) => ({
  collections: [],
  getAll: async () => {
    const result = await getAll();
    set({ collections: result });
  },
}));

export default useCollections;
