import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github"
import Credentials from "@auth/core/providers/credentials"

import type { NextAuthConfig } from "next-auth"

async function refreshAccessToken(token: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-Refresh-Token': token.refreshToken,
            }
        })

        const refreshedTokens = await response.json();

        console.log("Refreshed tokens: ", refreshedTokens)

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expiration_time * 1000,
            refreshToken: refreshedTokens.refresh_token,
            needRefresh: false,
        }
    }
    catch (error) {
        console.error("Error refreshing token", error);
        return null;
    }
}

export const config = {
    // @ts-ignore
    strategy: "jwt",
    callbacks: {
        jwt: ({ token, user, trigger } : any) => {
            // User is the data from the backend on initial sign in
            if (user) {
                token.accessToken = user.access_token;
                token.accessTokenExpires = Date.now() + (user.expiration_time || 3600) * 1000;
                token.refreshToken = user.refresh_token;
                token.username = user.username;
                token.needRefresh = false;
            }

            if (Date.now() > token.accessTokenExpires - 30000) {
                token.needRefresh = true;
            }

            if (Date.now() >= token.accessTokenExpires) {
                token.needRefresh = true;
                token.accessToken = null;
            }

            if (trigger === "update") {
                console.log("Token expired, refreshing token")
                return refreshAccessToken(token);
            }

            return token;
        },
        session: async ({ session, token } : any ) => {
            session.accessToken = token.accessToken;
            session.user.name = token.username;
            session.needRefresh = token.needRefresh;
            return session;
        },
    },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        Credentials({
            id: "login",
            name: "Login",
            credentials: {
                username: { label: "Username"},
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                    method: 'POST',
                    // @ts-ignore
                    body: new URLSearchParams(credentials),
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                })

                const user = await response.json()

                if (response.ok && user && user.access_token) {
                    console.log("User authenticated: ", user)
                    return {...user, username: credentials.username};
                }

                console.log("Error authenticating user: ", user)
                return null
            }
        }),
    ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)