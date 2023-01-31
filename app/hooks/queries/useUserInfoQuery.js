import { useQuery } from "react-query";
import { getUserInfo } from "../../api/getUserInfo";

export const useUserInfoQuery = (userInfo) =>
    useQuery(
        ['USER_INFO'], 
        async () => {

            let returnData = new Object();

            const response = await getUserInfo()
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData.errorCode;
                }

                returnData = respData;
            })

            return returnData;
        },
        { 
            cacheTime: 5 * 60 * 1000,
            staleTime: 5 * 60 * 1000,
        }
    );