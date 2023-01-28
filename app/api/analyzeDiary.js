export async function analyzeDiary(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/analyze", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}