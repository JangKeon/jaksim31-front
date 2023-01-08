import Link from "next/link";
import React from "react";
import diaryData from '../../../public/data/dairy.json';

export default function diaryShow() {

  const diary = diaryData;
  return (
    <>
      <div className="px-10 py-12 lg:px-28">
        <div className="grid grid-cols-3">
          
          {/* 날짜 및 키워드 */}
          <div className="col-span-3 sm:col-span-2">
            <div className="text-2xl font-extrabold">{diary.date}</div>
            <div className="flex flex-wrap mt-3">
                {diary.keywords.map((keyword, idx) => (
                    <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-slate-500 bg-slate-200 rounded-xl dark:bg-slate-200 dark:text-slate-800 ">
                        #{keyword.keyword}
                    </div>
                ))}
            </div>
          </div>

          {/* 감정 */}
          <div className="flex items-center col-span-3 sm:justify-end sm:col-span-1">
            <div className="text-lg">
                {diary.feeling}
            </div>
          </div>

          {/* 일기 내용 */}
          <div className="col-span-3 my-5">
            <div className="text-lg">
                {diary.Contents}
            </div>
          </div>

          {/* 목록, 수정, 삭제 */}
          <div className="flex items-center justify-center col-span-3 mt-4">
            <div className="text-xl">
              <button className="mx-2 text-base font-semibold duration-200 btn btn-secondary hover:scale-105">수정하기</button>
              <button className="mx-2 text-base font-semibold duration-200 btn btn-accent hover:scale-105">삭제하기</button>
              <Link href="/diary/list/grid" className="mx-2 text-base font-semibold duration-200 border-opacity-0 outline-none text-slate-50 bg-slate-400 hover:bg-slate-500 btn outline-0 border-spacing-0 hover:scale-105">목록으로</Link>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}