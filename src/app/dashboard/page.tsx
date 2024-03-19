"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import CredentialTable from "@/components/dashboard/credential_table";
import CredentialDetails from "@/components/dashboard/credential_details";
import TopNavbar from "@/components/navigation/navbar";
import {AuthModal} from "@/components/auth/auth_modal";
import {useSession} from "next-auth/react";
import {Skeleton} from "@nextui-org/react";
import useHttp from "@/hooks/use_http";
import {CredentialEntry, DetailPanelMode} from "@/interfaces";

const columns = [
    {label: "SITE", key: "site", sortable: true},
    {label: "NICKNAME", key: "nickname", sortable: true},
    {label: "FAVORITE", key: "favorite", sortable: true},
];

export default function Dashboard() {

    const { data: session } = useSession();
    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [credentials, setCredentials] = useState<CredentialEntry[]>([])
    const { httpRequest, isLoading, error } = useHttp();
    const [createCredentialModalOpen, setCreateCredentialModalOpen] = useState(false);
    const [credentialModalMode, setCredentialModalMode] = useState(DetailPanelMode.View);

    const fetchData = useCallback(() => {
        const applyData = (data: any) => {
            // Credential data received by the backend
            // Check fields and transform them if necessary
            setCredentials(data);
        };

        httpRequest({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/credentials`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`,
            }
        }, applyData).then(r => {});

        if (error) {
            console.error("Error log: ", error);
        }

    }, [httpRequest, session?.user]);

    useEffect(() => {
        if (session?.user) {
            fetchData();
        }
    }, [session?.user, fetchData]);

    const onSelectedCredential = (credential: CredentialEntry) => {
        setSelectedCredential((prevState) => {
            setCredentialModalMode(DetailPanelMode.View);
            // If selected credential is the same as the one clicked, then deselect it
            if (prevState && prevState.id === credential.id) {
                return null;
            }
            return credential;
        })
    };

    const onCredentialSave = async (data: CredentialEntry) => {
        const saveCredential = async () => {
            const applyData = (savedData: any) => {
                // Add the saved credential to the list of credentials
                console.log("Saved data: ", savedData);
                setCredentials(prevState => [...prevState, savedData]);
            };

            const requestBody = {
                nickname: data.nickname,
                email: data.email,
                username: data.username,
                encrypted_password: data.encrypted_password,
                favorite: data.favorite,
                site_id: data.site?.id,
                user_id: 0,
            };

            await httpRequest({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/credentials`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
                body: requestBody,
            }, applyData);

            if (error) {
                console.error("Error log: ", error);
            }

        };

        try {
            await saveCredential();
            setCreateCredentialModalOpen(false);
        }
        catch (error) {
            console.error("Error saving credential", error);
        }
    }

    const onCredentialDelete = async (data: CredentialEntry) => {
        const deleteCredential = async () => {
            const applyData = () => {
                // Remove the credential from the list of credentials
                setCredentials(prevState => prevState.filter(cred => cred.id !== data.id));
            };

            await httpRequest({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/credentials/${data.id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
            }, applyData);

            if (error) {
                console.error("Error log: ", error);
            }

        };

        try {
            await deleteCredential();
            setCreateCredentialModalOpen(false);
            setSelectedCredential(null);
        }
        catch (error) {
            console.error("Error saving credential", error);
        }
    }


    const toggleCreateCredentialModal = () => {
        setSelectedCredential(null);
        // If modal is closed, open it and set mode to create using the previous state
        setCreateCredentialModalOpen((prevState) => {
            if (!prevState) {
                setCredentialModalMode(DetailPanelMode.Create);
                return true;
            } else {
                setCredentialModalMode(DetailPanelMode.View);
                return false;
            }
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
            <TopNavbar
                onCreateNewCredential={toggleCreateCredentialModal}
            />
            <div className="flex h-full justify-between m-2 border-2 rounded-2xl bg-neutral-100">
                <div className={`transition-width duration-300 ease-in-out ${selectedCredential || createCredentialModalOpen ? 'w-3/4' : 'w-full'}  h-full rounded-2xl ${createCredentialModalOpen ? "blur-sm select-none pointer-events-none" : ""}`}>
                    <CredentialTable
                        dataColumns={columns}
                        data={credentials}
                        selectedCredential={selectedCredential}
                        onCredentialSelect={onSelectedCredential}
                    />
                </div>
                <div className={`relative right-0 0 transition-width duration-[500ms] ease-in-out border-primary-500 w-0 ${selectedCredential || createCredentialModalOpen ? "w-1/4" : "border-8 rounded-r-2xl"}`}>
                    {/* Details for a selected credential */}
                    <CredentialDetails
                        credential={selectedCredential}
                        mode={credentialModalMode}
                        onCancel={() => setCreateCredentialModalOpen(false)}
                        onSave={onCredentialSave}
                        onDelete={onCredentialDelete}
                    />
                </div>
            </div>
        </main>
    );
}
