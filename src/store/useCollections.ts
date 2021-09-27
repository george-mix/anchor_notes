import create from "zustand";

import {
  getAll,
  createCollection,
  deleteCollection,
} from "../database/controllers/CollectionController";
import CollectionModel from "../database/models/Collection";

interface CollectionState {
  collections: CollectionModel[];
  getAllCollections: () => Promise<void>;
  createCollection: (name: string) => Promise<void>;
  deleteCollection: (id: number) => Promise<void>;
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
  deleteCollection: async (id) => {
    const result = await deleteCollection(id);
    set({ collections: result });
  },
}));

export default useCollections;
