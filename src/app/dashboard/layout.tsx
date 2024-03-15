import { SessionProvider } from "next-auth/react"
import {auth} from "@/lib/auth";


export default async function DashboardLayout({children}: {
    children: React.ReactNode
}) {

    const session = await auth()

    // Used to reduce data shown in session
    // if (session?.user) {
    //     session.user = {
    //         name: session.user.name,
    // }

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
