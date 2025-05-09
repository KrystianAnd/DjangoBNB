'use server';

import { cookies } from "next/headers";

export async function handleRefresh(){
    

    const refreshToken = await getRefreshToken();

    const token = await fetch('../api/auth/token/refresh/' , {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then((json) => {
            

            if (json.access){
                  cookies().set('session_access_token', json.access, {
                    httpOnly : true,
                    secure : process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60,
                    path: '/'
                });

                return json.access;
            }else {
                resetAuthCookies();
            }
        })
        .catch((error) =>{
            

            resetAuthCookies();
        })

    return token;
}


export async function handleLogin(userId: string , accessToken : string , refreshToken : string) {
    (await cookies()).set('session_userid', userId, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });
    (await cookies()).set('session_access_token', accessToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/'
    });
    (await cookies()).set('session_refresh_token', refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });
} 

export async function resetAuthCookies() {
    const cookieStore = await cookies(); 
    cookieStore.set('session_userid', '');
    cookieStore.set('session_access_token', '');
    cookieStore.set('session_refresh_token', '');
}

export async function getUserId() {
    const userId = (await cookies()).get('session_userid')?.value; 
    return userId ? userId: null;
}

export async function getAccessToken() {
    let accessToken = (await cookies()).get('session_access_token')?.value; 
    
    if (!accessToken){
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = (await cookies()).get('session_refresh_token')?.value; 

    return refreshToken;
}
