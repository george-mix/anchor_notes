import create from "zustand";

type IdState = {
  id: number;
  newId: (id: number) => void;
};

export const useId = create<IdState>((set) => ({
  id: 0,
  newId: (id) => set({ id: id }),
}));
