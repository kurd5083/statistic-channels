import { create } from 'zustand';
import { type MetricType } from '@/types/Metric';

type SelectedChannelStore = {
    selectChannel: null | {
        name: string,
        id: number
    },
    metric: MetricType;
    period: string;
    dailyStats: { date: string; value: number }[];

    setChannel: ({ name, id }: {name: string, id: number }) => void;
    setMetric: (metric: MetricType) => void;
    setPeriod: (period: string) => void;
    setDailyStats: (stats: { date: string; value: number }[]) => void;
}

export const useSelectedChannelStore = create<SelectedChannelStore>((set) => ({
    selectChannel: null,
    metric: 'subscriptions',
    period: 'day',
    dailyStats: [],

    setChannel: ({ name, id }) => set({ selectChannel: {name, id} }),
    setMetric: (metric) => set({ metric }),
    setPeriod: (period) => set({ period }),
    setDailyStats: (stats) => set({ dailyStats: stats }),
}));
