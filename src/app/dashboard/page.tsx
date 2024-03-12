"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import CredentialTable from "@/components/dashboard/credential_table";
import CredentialDetails from "@/components/dashboard/credential_details";
import TopNavbar from "@/components/navigation/navbar";
import {AuthModal} from "@/components/auth/auth_modal";
import {useSession} from "next-auth/react";
import {Skeleton} from "@nextui-org/react";
import useHttp from "@/hooks/use_http";

const columns = [
    {label: "SITE", key: "site", sortable: true},
    {label: "NICKNAME", key: "nickname", sortable: true},
    {label: "FAVORITE", key: "favorite", sortable: true},
];

export default function Dashboard() {

    const {data: session} = useSession();
    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [credentials, setCredentials] = useState<CredentialEntry[]>([])
    const { httpRequest, isLoading, error } = useHttp();

    const fetchData = useCallback(() => {
        const applyData = (data: any) => {
            console.log(data);
            // Credential data received by the backend
            // Check fields and transform them if necessary
            setCredentials(data);
        };

        httpRequest({
            url: process.env.BASE_URL + "/dashboard/credentials" + "/mock",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.jwt}`,
            }
        }, applyData).then(r => {});
    }, [httpRequest]);

    useEffect(() => {
        if (session?.user) {
            fetchData();
        }
    }, [session?.user, fetchData]);

    const onSelectedCredential = (credential: CredentialEntry) => {
        setSelectedCredential((prevState) => {
            // If selected credential is the same as the one clicked, then deselect it
            if (prevState && prevState.id === credential.id) {
                return null;
            }
            return credential;
        })
    };

    // If the user is not logged in, show the login modal
    if (!session || !session.user) {
        return (
            <div className="flex flex-col h-full w-full gap-y-2">
                <AuthModal isOpen={true} onClose={() => {}}/>
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
        <main className="flex flex-col h-full justify-between">
            <TopNavbar/>
            <div className="flex h-full justify-between m-2 border-2 rounded-2xl bg-neutral-100">
                <div className={`transition-width duration-300 ease-in-out ${selectedCredential ? 'w-2/3' : 'w-full'}  h-full rounded-2xl`}>
                    <CredentialTable
                        dataColumns={columns}
                        data={credentials}
                        selectedCredential={selectedCredential}
                        onCredentialSelect={onSelectedCredential}
                    />
                </div>
                <div className={`relative right-0 0 transition-all duration-200 ease-in-out ${selectedCredential ? "w-1/3 m-4 ml-0 " : "w-0"}  rounded-2xl`}>
                    {/* Details for a selected credential */}
                    <CredentialDetails credential={selectedCredential}/>
                </div>
            </div>
        </main>
    );
}
