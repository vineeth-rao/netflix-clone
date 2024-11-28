import { create } from "zustand";

export const UseContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
