"use client";

import { useSession} from "next-auth/react";
import {Skeleton} from "@nextui-org/react";
import {AuthModal} from "@/components/auth/auth_modal";
import Dashboard from "@/components/dashboard/dashboard_content";
import {useEffect, useState} from "react";
import {debounce} from "@/lib/utils";

export default function DashboardPage() {
    const { data: session, update, status } = useSession();
    const [updatingToken, setUpdatingToken] = useState(false);

    async function refreshAccessToken () {
        console.log("Refreshing token")
        await update({});
    }

    const debouncedRefreshAccessToken = debounce(refreshAccessToken, 10000);


    useEffect( () => {
        if (status === "authenticated" && session?.needRefresh && !updatingToken) {
            console.log("Refreshing session");
            setUpdatingToken(true);
            refreshAccessToken().then(r => { setUpdatingToken(false); })
        }
    }, [session, status, update]);

    if (status === "loading") {
        return <Skeleton />;
    }

    // If the user is not logged in, show the login modal
    if (status === "unauthenticated" || !session?.accessToken) {
        return (
            <div key="auth" className="flex flex-col h-full w-full gap-y-2">
                <AuthModal isOpen={true}/>
                {/*  Top Navbar  */}
                <div className="w-full h-16">
                    <Skeleton className="rounded-lg flex m-2 h-full"/>
                </div>
                <div className="flex flex-col w-full flex-grow p-4 mt-6">
                    {/*  Table results label and items per page dropdown  */}
                    <div className="flex flex-row w-full justify-between">
                        <Skeleton className="rounded-lg h-5 w-1/5"/>
                        <Skeleton className="rounded-lg h-5 w-1/5"/>
                    </div>
                    {/*  Table */}
                    <div className="w-full flex-grow mt-4">
                        <Skeleton className="rounded-lg flex h-full"/>
                    </div>
                    {/*  Pagination */}
                    <div className="flex flex-row w-full h-6 mt-4 justify-between">
                        <Skeleton className="rounded-lg h-5 w-full"/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Dashboard session={session}/>
    );
}
