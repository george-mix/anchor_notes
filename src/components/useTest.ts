import create from "zustand";

type TestState = {
  id: number;
  newId: (id: number) => void;
};

export const useTest = create<TestState>((set) => ({
  id: 0,
  newId: (id) => set({ id: id }),
}));
