import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStore = create(
  persist(
    (set) => ({
    view: "table",
    content: "user",
    user: "",

    setView: (value) => set({ view: value }),
    setContent: (value) => set({ content: value }),
    setUser: (value) => set({ user: value }),
    }),{
      name: 'app-storage',
    })
)

export default useStore
