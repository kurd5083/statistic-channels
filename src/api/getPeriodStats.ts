import apiClient from "@/api/apiClient";

export const getPeriodStats = async({ resourceId, dateFrom, dateTo, includeDetails }: { 
    resourceId: number, dateFrom: string, dateTo: string, includeDetails: boolean 
}) => {
    const response = await apiClient.get('/api/proxy/invite-tracking/resource-period-stats', {params: {
        resourceId,
        dateFrom,
        dateTo,
        includeDetails
    }})
    return response.data
}