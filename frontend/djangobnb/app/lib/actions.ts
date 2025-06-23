'use server';

import { cookies } from "next/headers";

export async function handleRefresh() {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    const token = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/token/refresh/`, {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then(async (json) => {
            if (json.access) {
                const cookieStore = await cookies(); 
                cookieStore.set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60,
                    path: '/',
                });
                return json.access;
            } else {
                return null;
            }
        })
        .catch(async (error) => {
            return null;
        });

    return token;
}


export async function handleLogin(userId: string , accessToken : string , refreshToken : string) {
    const cookieStore = await cookies(); 

    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
    });
    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
}


export async function resetAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.set('session_userid', '', {
        maxAge: 0,
        path: '/',
    });
    cookieStore.set('session_access_token', '', {
        maxAge: 0,
        path: '/',
    });
    cookieStore.set('session_refresh_token', '', {
        maxAge: 0,
        path: '/',
    });
    return true;
}

export async function getUserId() {
    const userId = (await cookies()).get('session_userid')?.value; 
    console.log('👤 userId from cookie:', userId);
    return userId ? userId: null;
}

export async function getAccessToken() {
    let accessToken = (await cookies()).get('session_access_token')?.value; 
    console.log('🔑 accessToken from cookie:', accessToken);
    if (!accessToken){
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = (await cookies()).get('session_refresh_token')?.value; 

    return refreshToken;
}
