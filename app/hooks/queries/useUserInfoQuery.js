import { useQuery } from "react-query";
import { getUserInfo } from "../../api/getUserInfo";

export const useUserInfoQuery = (userInfo) =>
    useQuery(
        ['USER_INFO'], 
        async () => {
            const response = await getUserInfo();
            return response.json();
        },
        { 
            cacheTime: 5 * 60 * 1000,
            staleTime: 5 * 60 * 1000,
        }
    );