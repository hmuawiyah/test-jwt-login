import { create } from "zustand"

const useViewStore = create((set) => ({
  view: "table",
  content: "user",

  setView: (value) => set({ view: value }),
  setContent: (value) => set({ content: value }),
}))

export default useViewStore
