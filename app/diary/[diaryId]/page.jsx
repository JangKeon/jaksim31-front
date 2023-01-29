import React from "react";
import { getDiary } from "../../api/getDiary";
import DiaryContents from "./diaryContents";

// async function getDiaryData(diaryId) {
//     // TODO
//     // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
//     // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
//     const res = await getDiary(process.env.NEXT_PUBLIC_USER_ID, diaryId);
  
//     if (res.status != 200) {
//       throw new Error('Failed to fetch data');
//     }
  
//     return res.json();
// }

export default async function diaryShow({ params }) {

  const { diaryId } = params;
  // const diary = await getDiaryData(diaryId);  
  
  return (
    <>
      <div className="px-10 py-12 lg:px-28">
        <DiaryContents diaryId={ diaryId }/>
        {/* <DiaryContents diaryId={ diaryId } diary={diary} /> */}
      </div>
    </>
  )
}