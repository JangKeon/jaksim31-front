'use client';

import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useDiaryDelete } from "../../hooks/mutations/useDiaryDelete";
import { useDiaryQuery } from "../../hooks/queries/useDiaryQuery";
import Error from "./error";
import Loading from "./loading";

export default function DiaryContents(props) {

    const router = useRouter();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    
    // react-query
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, isFetched, isError } = useDiaryQuery(props.diaryId)

    // diary data 삭제를 위한 useMutation
    const { status, mutate } = useDiaryDelete(props.diaryId, queryClient)

    if ( isLoading || data == undefined ) return <Loading className="flex justify-center w-full"/>
 
    if ( isError ) return <Error className="flex justify-center w-full"/>

    function deleteDiary() {
        mutate()
        closeDeleteModal()
        openSuccessModal()
    }
    
    function openDeleteModal() { setIsDeleteModalOpen(true) }
    function closeDeleteModal() { setIsDeleteModalOpen(false) }
  
    function openSuccessModal() { setIsSuccessModalOpen(true) }
    function closeSuccessModal() { 
        setIsSuccessModalOpen(false);
        router.replace('diary/list/calendar');
    }
    

    return (
      <>
          <div className="grid grid-cols-3">
          
          {/* 날짜 및 키워드 */}
          <div className="col-span-3 sm:col-span-2">
            <div className="text-2xl font-extrabold">{moment(data.diaryDate).format("YYYY. MM. DD.")}</div>
            <div className="flex flex-wrap mt-3">
                {data.keywords.map((keyword) => (
                    <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
                        #{keyword}
                    </div>
                ))}
            </div>
          </div>

          {/* 감정 */}
          <div className="flex items-center col-span-3 sm:justify-end sm:col-span-1">
            <div className="text-base">
                {data.emotion}
            </div>
          </div>

          {/* 일기 내용 */}
          <div className="col-span-3 my-5">
            {/* HTML 타입으로 텍스트 표시 - 글자 크기, 글자 색 등 */}
            <div className='text-lg' dangerouslySetInnerHTML={{__html: data.content}}></div>
          </div>

          {/* 목록, 수정, 삭제 */}
          <div className="flex items-center justify-center col-span-3 mt-4">
            <div className="text-xl">
              <Link href={"diary/"+props.diaryId+"/modify"} className="mr-2 font-semibold duration-200 sm:text-base btn btn-secondary hover:scale-105">수정하기</Link>
              <button onClick={openDeleteModal} className="mx-2 font-semibold duration-200 sm:text-base btn btn-accent hover:scale-105">삭제하기</button>
              <button onClick={() => router.back()} className="ml-2 font-semibold duration-200 border-opacity-0 outline-none sm:text-base text-zinc-50 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">뒤로가기</button>
            </div>
          </div>
        </div>

        
        <Transition appear show={isDeleteModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                      as="h3"
                      className="text-base font-extrabold leading-6 text-zinc-900"
                  >
                     일기 삭제
                  </Dialog.Title>
                  <div className="mt-3">
                      <p className="text-lg text-zinc-500">
                      일기을 삭제하시겠습니까?
                      </p>
                      <p className="mt-1 text-base text-red-500">
                      🚨 삭제한 일기는 다시 복구할 수 없습니다.
                      </p>
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="justify-center px-2 py-1.5 mx-2 text-base font-semibold duration-200 border border-transparent rounded-md text-zinc-700 bg-zinc-200 hover:bg-zinc-300 focus:outline-none "
                          onClick={() => closeDeleteModal()}
                          >
                          닫기
                      </button>

                      <button
                          type="button"
                          className="justify-center px-2 py-1.5 mx-2 text-base font-semibold text-red-900 duration-200 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none "
                          onClick={() => deleteDiary()}
                          >
                          일기 삭제하기
                      </button>
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
        </Transition>


        <Transition appear show={isSuccessModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                        as="h3"
                        className="text-base font-extrabold leading-6 text-zinc-900"
                    >
                        일기 삭제 성공
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-lg text-zinc-500">
                        일기가 성공적으로 삭제되었습니다!
                        </p>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="justify-center px-2 py-1.5 mx-2 text-base font-semibold text-green-700 duration-200 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none "
                            onClick={closeSuccessModal}
                            >
                            확인
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
      </>
    )
}
  