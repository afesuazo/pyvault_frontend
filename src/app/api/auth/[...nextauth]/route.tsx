import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import process from "process";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            id: "login",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Temp

                const demo_user = { id: "42", name: "sofi", password: "frida123" }
                return credentials?.username === demo_user.name && credentials?.password === demo_user.password ? demo_user : null;

                const res = await fetch(process.env.BASE_URL + '/auth/login', {
                    method: 'POST',
                    body: new URLSearchParams(credentials),
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                })

                const user = await res.json()
                if (res.ok && user) {
                    return user
                }

                console.log("Error authenticating user: ", user)
                return null
            }
        }),
    ],
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };