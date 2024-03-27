"use client";

import {useCallback, useEffect, useState} from "react";
import CredentialTable from "@/components/dashboard/credential_table";
import CredentialDetails from "@/components/dashboard/credential_details";
import TopNavbar from "@/components/navigation/navbar";
import useHttp from "@/hooks/use_http";
import {CredentialEntry, DashboardProps, DetailPanelMode, Site} from "@/interfaces";
import {debounce} from "@/lib/utils";

const columns = [
    {label: "SITE", key: "site", sortable: true},
    {label: "NICKNAME", key: "nickname", sortable: true},
    {label: "FAVORITE", key: "favorite", sortable: true},
];

export default function Dashboard({session}: DashboardProps) {

    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [credentials, setCredentials] = useState<CredentialEntry[]>([])
    const [sites, setSites] = useState<Site[]>([])
    const { httpRequest, isLoading, error } = useHttp();
    const [createCredentialModalOpen, setCreateCredentialModalOpen] = useState(false);
    const [credentialModalMode, setCredentialModalMode] = useState(DetailPanelMode.View);

    const fetchData = useCallback(debounce(() => {
        console.log("Fetching data");

        const applySiteData = (data: any) => {
            // Credential data received by the backend
            // Check fields and transform them if necessary
            setSites(data);
        };

        const applyData = (data: any) => {
            // Credential data received by the backend
            // Check fields and transform them if necessary
            setCredentials(data);
        };

        httpRequest({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/sites`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`,
            }
        }, applySiteData).then();

        httpRequest({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/credentials`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`,
            }
        }, applyData).then();

        if (error) {
            console.error("Error log: ", error);
        }

    }, 1000), [httpRequest, session?.accessToken, error]);

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

    const onUpdateCredential = async (data: CredentialEntry) => {
        const updateCredential = async () => {
            const applyData = (updatedData: any) => {
                // Update the credential in the list of credentials with the new data
                setCredentials(prevState => prevState.map(cred => {
                    if (cred.id === updatedData.id) {
                        return updatedData;
                    }
                    return cred;
                }));

                if (selectedCredential && selectedCredential.id === updatedData.id) {
                    setSelectedCredential(updatedData);
                }
            };

            const requestBody = {
                nickname: data.nickname,
                email: data.email,
                username: data.username,
                encrypted_password: data.encrypted_password,
                favorite: data.favorite,
                site_id: data.site?.id || null,
            };

            await httpRequest({
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/credentials/${data.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
                body: requestBody
            }, applyData);

            if (error) {
                console.error("Error log: ", error);
            }

        };

        try {
            await updateCredential();
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
            }

            setCredentialModalMode(DetailPanelMode.View);
            return false;
        })
    };

    return (
        <main key="dashboard" className="flex flex-col h-full justify-between">
            <TopNavbar
                onCreateNewCredential={toggleCreateCredentialModal}
                session={session}
            />
            <div className="flex h-full justify-between m-2 border-2 rounded-2xl bg-neutral-100">
                <div className={`transition-width duration-300 ease-in-out ${selectedCredential || createCredentialModalOpen ? 'w-3/4' : 'w-full'}  h-full rounded-2xl ${createCredentialModalOpen ? "blur-sm select-none pointer-events-none" : ""}`}>
                    <CredentialTable
                        dataColumns={columns}
                        data={credentials}
                        selectedCredential={selectedCredential}
                        onCredentialSelect={onSelectedCredential}
                        onFavoriteCredential={onUpdateCredential}
                    />
                </div>
                <div className={`relative right-0 0 transition-width duration-[500ms] ease-in-out border-primary-500 w-0 ${selectedCredential || createCredentialModalOpen ? "w-1/4" : "border-8 rounded-r-2xl"}`}>
                    <CredentialDetails
                        availableSites={sites}
                        credential={selectedCredential}
                        mode={credentialModalMode}
                        onCancel={() => setCreateCredentialModalOpen(false)}
                        onSave={onCredentialSave}
                        onDelete={onCredentialDelete}
                        onEdit={onUpdateCredential}
                    />
                </div>
            </div>
        </main>
    );
}
