import { create } from "zustand";

type FilterСhannels = {
    filter: string,
    setFilter: (f: string) => void
}

export const useFilterСhannels = create((set): FilterСhannels => ({
    filter: 'day',
    setFilter: (f) => set({ filter: f })
}))