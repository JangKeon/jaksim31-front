'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import badIcon from '../../../../public/images/emotion/bad-small.png'
import boredIcon from '../../../../public/images/emotion/bored-small.png'
import embarrassedIcon from '../../../../public/images/emotion/embarrassed-small.png'
import goodIcon from '../../../../public/images/emotion/good-small.png'
import nothingIcon from '../../../../public/images/emotion/nothing-small.png'
import sadIcon from '../../../../public/images/emotion/sad-small.png'
import scaredIcon from '../../../../public/images/emotion/scared-small.png'
import surprisedIcon from '../../../../public/images/emotion/surprised-small.png'
import unsureIcon from '../../../../public/images/emotion/unsure-small.png'
import Image from 'next/image';
import diarysData from '../../../../public/data/diaryList.json'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import './Calendar.css'

const emotions = [
  {
    name: "싫음",
    src: badIcon,
    alt: "bad",
  },
  {
    name: "지루함",
    src: boredIcon,
    alt: "bored",
  },
  {
    name: "창피함",
    src: embarrassedIcon,
    alt: "embarrassed",
  },
  {
    name: "좋음",
    src: goodIcon,
    alt: "good",
  },
  {
    name: "감정없음",
    src: nothingIcon,
    alt: "nothing",
  },
  {
    name: "놀람",
    src: surprisedIcon,
    alt: "surprised",
  },
  {
    name: "두려움",
    src: scaredIcon,
    alt: "scared",
  },
  {
    name: "슬픔",
    src: sadIcon,
    alt: "sad",
  },
  {
    name: "불확실",
    src: unsureIcon,
    alt: "unsure",
  },
]

// react-calendar에서 각 day에 대한 날짜를 date라는 변수로 관리하기에 date에서의 변수와 중복되어 오류 발생
// data 로 받는 변수의 key값을 임의로 변경해주기 (date=>diaryDate)
const diarys = diarysData.diaryList;
function renameKey ( obj, oldKey, newKey ) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}
diarys.forEach( obj => renameKey( obj, 'date', 'diaryDate' ) );

export default function CalendarList() {
  const [clickState, setClickState] = useState([]);
  const Calendar = dynamic(() => import('react-calendar'), { ssr: false, })

  // TODO - 선택된 감정에 대한 일기 조회 API 호출
  // 선택된 감정에 대한 일기 목록 조회
  function findDiaryByEmotion(e, emotion) {
    // 선택되어 있지 않은 경우 (새로운 감정 추가)
    if(!clickState.includes(emotion)){
      setClickState([...clickState, emotion])
      e.target.classList.remove("opacity-60")
      e.target.classList.add("opacity-100", "drop-shadow-lg")
      // 선택한 감정에 대해 query parameter(emotion) 설정하여 API 호출 => 해당 감정에 대한 API 호출함 
      // 

      // 보여줄 data에 위 API 호출에 대한 응답으로 받은 데이터 추가
      // 
    } 
    // 이미 선택되어 있는 경우 (감정 제외)
    else {
      setClickState(clickState.filter((clickedItem) => clickedItem !== emotion));
      e.target.classList.add("opacity-60")
      e.target.classList.remove("opacity-100")

      // data에서 제외할 감정을 emotion으로 갖는 데이터 제외
      // 
    }

  }
  
  return (
    <>
      <div className='w-[75vw] lg:w-[65vw] xl:w-[55vw]'>
        <div className='flex mt-10 mb-10 sm:mx-6 md:mx-10 lg:mt-4 lg:mx-12 place-content-between'>
          {/* 감정 아이콘 버튼 */}
          {/* TODO - 감정 아이콘 클릭시 해당 감정 일기 가져오는 함수 만들기 */}
          {emotions.map((emotion) => (
            <div key={emotion.name} className="relative w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 tooltip" onClick={(e) => findDiaryByEmotion(e, emotion.name)} data-tip={emotion.name}>
              <Image src={emotion.src} alt={emotion.alt} placeholder='empty' className='duration-200 opacity-60 hover:scale-105 hover:opacity-100'/>
            </div>
          ))}
        </div>
      </div>
      {/* Calendar */}
      <div className='flex justify-center mb-5 sm:mt-5 md:mt-10'>
        <Calendar
          className="w-[75vw] lg:w-[65vw] xl:w-[50vw]"
          value={new Date()}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date, view }) => {
            let matchedDiary = diarys.find(({diaryDate}) => moment(diaryDate).format('YYYY-MM-DD') == moment(date).format("YYYY-MM-DD"))

            // 일기가 있을 경우 해당 일기에 맞는 아이콘 보여주기 => 클릭시 일기 조회 페이지로 이동
            if((matchedDiary != undefined) && (view === 'month')) {
              // 데이터의 emotion과 일치하는 emotionSet 설정 (아이콘 src 가져오기 위함)
              let matchedEmotion = emotions.find(({name}) => name == matchedDiary.emotion)
              return (
               <>
                <Link href={"/diary/"+matchedDiary.diaryId} className="flex items-center justify-center mt-2 dayBox">
                   <div className="relative w-6 h-6 duration-200 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:drop-shadow-lg hover:opacity-80 hover:scale-105">
                     <Image src={matchedEmotion.src} alt="emotion" placeholder='empty' width={100} height={100}/>
                   </div>
                </Link>
               </>
              )
            }
            // 일기가 없을 때에는 일기 쓰기 버튼 보여주기
            else if (view === 'month') {
              let selectedDate = moment(date).format("YYYYMMDD")
              return (
                <>
                  <div className="flex items-center justify-center mt-2 overflow-visible dayBox group">
                   <Link href={'/diary/create/'+ encodeURIComponent(btoa(selectedDate))} className="relative w-6 h-6 overflow-visible duration-200 opacity-0 group sm:w-10 sm:h-10 group-hover:opacity-100 hover:opacity-80 hover:scale-105">
                    <PlusCircleIcon alt="add" placeholder='empty' className='text-zinc-200'/>
                    <p className='px-1 text-[4px] lg:text-[5px] text-center text-zinc-400 opacity-0 group-hover:opacity-100 h-fit w-100 rounded-xl bg-zinc-200'>일기 쓰기</p>
                   </Link>
                  </div>
                </>
               )
            }
          }}
        />
      </div>
    </>
  )
}