export async function getDiary(userId, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+userId+"/"+diaryId);
    return res;
}