import { create } from 'zustand';
import { type Resource } from '@/types/Resource';

type ResourcesUser = {
    resources: Resource[],
    query: string,
    filteredResources: Resource[],

    initResources: (statsArray: Resource[]) => void,
    searchResources: (query: string) => void
}

export const useResourcesUser = create((set, get): ResourcesUser => ({
    resources: [],
    query: '',
    filteredResources: [],

    initResources: (statsArray) => {
        const formatted = statsArray?.map((r) => {
            
            return {
                id: r.id,
                name: r.name,
                subscribers: 1,
                joins: r.joins,
                unsubscribes: r.unsubscribes,
                netTraffic: r.netTraffic,
                conversion: r.conversion,
                sub_count: r.sub_count,
                avatar: r.avatar,
            };
        })
        set({ resources: formatted, filteredResources: formatted });
    },

    searchResources: (query) => {
        const { resources } = get();

        if (!query) {
            set({ query: '', filteredResources: resources });
            return;
        }

        const q = query.toLowerCase();

        set({
            query,
            filteredResources: resources.filter((item) =>
                item.name.toLowerCase().includes(q)
            ),
        });
    },
}))