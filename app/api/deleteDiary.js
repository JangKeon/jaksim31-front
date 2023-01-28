export async function deleteDiary(userId, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+userId+"/"+diaryId, {
        method:"DELETE"
    });
    return res;
}