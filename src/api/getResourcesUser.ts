import apiClient from "@/api/apiClient";

export const getResourcesUser = async({ userTelegramId }: {userTelegramId: number}) => {
    const response = await apiClient.get(`/api/proxy/traffic/resources/user/${userTelegramId}`)
    return response.data
}