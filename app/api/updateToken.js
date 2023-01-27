import { getCookie } from "cookies-next";

export async function updateToken(data) {

    const userId = getCookie("userId");

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/" + userId + "/reissue", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}