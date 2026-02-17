import { create } from "zustand";

import { getDateFromFilter, getToday } from '@/lib/dateUtils';

import { type Resource } from '@/types/Resource';

import { getPeriodStats } from "@/api/getPeriodStats";

type StatsChannels = {
    subscribers24h: number,
    unsubscribes24h: number,
    cleanTraffic: number,
    conversion: number,
    loading: boolean,
    changeStats: (resources: Resource[]) => void
}

export const useStatsChannels = create((set): StatsChannels => ({
    subscribers24h: 0,
    unsubscribes24h: 0,
    cleanTraffic: 0,
    conversion: 0,
    loading: false,

    changeStats: async (resources) => {
        set({ loading: true });

        const from24h = getDateFromFilter("day");
        const fromMonth = getDateFromFilter("month");
        const today = getToday();

        let subscribers24hSum = 0;
        let unsubscribes24hSum = 0;
        let cleanTrafficSum = 0;

        await Promise.all(
            resources.map(async (resource) => {
                const stats24h = await getPeriodStats({
                    resourceId: resource.id,
                    dateFrom: from24h,
                    dateTo: today,
                    includeDetails: false
                });
                const summary24h = stats24h.data.stats.summary;

                subscribers24hSum += summary24h.totalJoins;
                unsubscribes24hSum += summary24h.totalLeaves;

                const statsYear = await getPeriodStats({
                    resourceId: resource.id,
                    dateFrom: fromMonth,
                    dateTo: today,
                    includeDetails: false
                });
                
                cleanTrafficSum += statsYear.data.stats.summary.currentActive;
            })
        );
        
        const conversion = subscribers24hSum > 0 
            ? Math.round(((subscribers24hSum - unsubscribes24hSum) / subscribers24hSum) * 100)
            : 0;

        set({
            subscribers24h: subscribers24hSum,
            unsubscribes24h: unsubscribes24hSum,
            cleanTraffic: cleanTrafficSum,
            conversion,
            loading: false,
        });
    },
}));