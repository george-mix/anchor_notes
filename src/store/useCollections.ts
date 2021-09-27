import create from "zustand";

import {
  getAll,
  createCollection,
} from "../database/controllers/CollectionController";
import CollectionModel from "../database/models/Collection";

interface CollectionState {
  collections: CollectionModel[];
  getAllCollections: () => Promise<void>;
  createCollection: (name: string) => Promise<void>;
}

const useCollections = create<CollectionState>((set) => ({
  collections: [],
  getAllCollections: async () => {
    const result = await getAll();
    set({ collections: result });
  },
  createCollection: async (name) => {
    const result = await createCollection({ name });
    set({ collections: result });
  },
}));

export default useCollections;
