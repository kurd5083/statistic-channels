import { useQuery } from "@tanstack/react-query";
import { getResourcesUser } from "@/api/getResourcesUser";

export const useGetResourcesUser = ({ userTelegramId }: {userTelegramId: number}) => {
    const {data: resourcesUser, isLoading: loadingResourcesUser}  = useQuery({
        queryKey: ['resources-user', userTelegramId],
        queryFn: () => getResourcesUser({ userTelegramId }),
    })

    return { resourcesUser, loadingResourcesUser }
}
