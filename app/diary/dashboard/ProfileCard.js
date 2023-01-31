'use client';

import Loading from "../list/grid/loading";
import Error from "../list/grid/error";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";

// export default function UserProfile(userInfo) {
export default function ProfileCard() {

    // 유저 정보 data fetching을 위한 useQuery
    const { data, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();

    if( isLoading || isFetching ) return <Loading className="flex justify-center"/>
    if ( isError ) return <Error className="flex justify-center"/>

    return (
        <>
            <div className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-100 lg:max-w-lg rounded-xl">
                <div className="text-xl font-semibold text-zinc-700">
                My Profile🙋
                </div>
                <div className='flex flex-col text-center justify-items-center'>
                    {/* 프로필 사진 */}
                    <div className="justify-center m-5 avatar">
                        <div className="w-32 rounded-full">
                            <img src={data.profileImage}/>
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className='text-3xl font-extrabold text-zinc-700'>
                        {data.username}
                    </div>
                    {/* 사용자 ID (이메일) */}
                    <p className="text-sm text-zinc-500">
                        {data.loginId}
                    </p>
                    {/* divider */}
                    <div className="my-6 border-b-2"></div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                            {/* 총 작성한 일기 수 */}
                            <div className='col-span-3 mb-1'>
                                <div className="mb-1 text-lg text-zinc-600">
                                    오늘까지 기록한 나의 일기
                                </div>
                                <div className='text-3xl font-bold'>
                                    {data.diaryTotal}개
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}