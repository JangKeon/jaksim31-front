'use client';

import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Image from "next/image";
import moment from "moment";
import Loading from "./loading";
import Error from "./error";
import { useDiaryListQuery } from "../../../hooks/queries/useDiaryListQuery";

// const diarys = diarysData.diaryList;

// 진행중 일기 세부 메뉴
const diaryMenu = [
  { name: '일기 수정', href: 'diary/' },
  { name: '일기 삭제', href: 'deleteDiary' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function openDeleteModal(diaryId) {
    
}

  
export default function DiaryGridList(props) {
    
    // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
    // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
    const { data, isLoading, isFetching, isFetched, isError } = useDiaryListQuery(props.diaryList)

    if ( isLoading || isFetching ) return <Loading className="flex justify-center"/>
 
    if ( isError ) return <Error className="flex justify-center"/>

    const diarys = data.content;

    return (
        <div className="bg-white">
        <div className="px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8 lg:py-3">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 2xl:grid-cols-3">
                {diarys.map((diary) => (
                    <div key={diary.diaryId} className="rounded-2xl bg-zinc-200/50">
                        <div className="w-full overflow-hidden rounded-t-lg bg-zinc-200 aspect-w-4 aspect-h-3 xl:aspect-w-4 xl:aspect-h-3">
                                <Link
                                    href={{
                                        pathname: 'diary/'+diary.diaryId
                                        }} 
                                    className="relative flex items-center justify-center w-full group"
                                    >
                                    <div className="absolute hidden text-3xl font-extrabold group-hover:block">
                                        {diary.emotion}
                                    </div>
                                    <div className="relative object-cover object-center aspect-[4/3] w-full overflow-hidden">
                                        <Image
                                            src={diary.thumbnail}
                                            alt={diary.emotion}
                                            placeholder="empty"
                                            fill
                                            className="object-cover duration-200 hover:opacity-20 hover:scale-105"
                                        />
                                    </div>
                                </Link>
                        </div>
                        <div className="flex justify-between mx-4 mt-5 mb-2">
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="ml-2 text-lg font-bold truncate text-zinc-900">{moment(diary.diaryDate).format('YYYY. MM. DD.')}</p>
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex max-w-xs text-sm focus:outline-none">
                                                <EllipsisVerticalIcon className="block w-6 h-6"/>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                        <Menu.Items className="absolute right-0 z-10 py-1 mt-2 mb-10 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {diaryMenu.map((item) => (
                                                <Menu.Item key={item.name}>                                             
                                                    {
                                                        item.href.includes('/')
                                                            ?
                                                            ({ active }) => (
                                                                <Link
                                                                    href={item.href + diary.diaryId + '/modify'}                                                            >
                                                                    <div className={classNames(
                                                                        active ? 'bg-zinc-100' : '',
                                                                        'block px-4 py-2 text-sm text-zinc-700 border-b-2 border-gray-100'
                                                                    )}>
                                                                        {item.name}
                                                                    </div>
                                                                </Link>
                                                            )
                                                            :
                                                            <a
                                                                onClick={openDeleteModal(diary.diaryId)}
                                                                className='block px-4 py-2 text-sm border-b-2 text-zinc-700 border-zinc-100 hover:bg-zinc-100 '
                                                            >
                                                                {item.name}
                                                            </a>
                                                    }
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="flex flex-wrap mt-2">
                                    {diary.keywords.map((keyword) => (
                                        <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 hover:scale-105 hover:bg-zinc-300 hover:text-zinc-600 duration-200">
                                            #{keyword}
                                        </div>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                </div>
            ))}
            </div>
            
        </div>
        </div>
    )
}
