import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github"
import Credentials from "@auth/core/providers/credentials"

import type { NextAuthConfig } from "next-auth"

export const config = {
    callbacks: {
        // TODO: Add types for both callbacks
        jwt({ token, trigger, user } : any) {
            // User is the data from the backend on initial sign in
            // console.log("JWT Callback: ", token, trigger, user)
            if (user) {
                token.accessToken = user.access_token;
                token.username = user.username;
            }
            return token;
        },
        session: async ({ session, token } : any ) => {
            // console.log("Session Callback: ", session, token)
            session.accessToken = token.accessToken;
            session.user.username = token.username;
            // console.log("Session Post Callback: ", session)
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