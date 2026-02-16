import { type MetricType } from '@/types/Metric';

export const getMetricValue = (item: any, metric: MetricType) => {
    const joins = item.joins ?? 0;
    const unsubscribes = item.leaves ?? 0;

    switch (metric) {
        case 'subscriptions':
            return joins;
        case 'unsubscriptions':
            return unsubscribes;
        case 'netTraffic':
            return joins - unsubscribes;
        case 'conversion':
            return joins > 0 ? Math.round(((joins - unsubscribes) / joins) * 100) : 0;
        default:
            return 0;
    }
};
