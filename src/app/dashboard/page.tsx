"use client";

import {useCallback, useMemo, useState} from "react";
import CredentialTable from "@/components/dashboard/credential_table";
import CredentialDetails from "@/components/dashboard/credential_details";
import TopNavbar from "@/components/navigation/navbar";
import {AuthModal} from "@/components/auth/auth_modal";
import {useSession} from "next-auth/react";
import {Skeleton} from "@nextui-org/react";

const columns = [
    {label: "SITE", key: "site", sortable: true},
    {label: "NICKNAME", key: "nickname", sortable: true},
    {label: "FAVORITE", key: "favorite", sortable: true},
];

export default function Dashboard() {

    const {data: session} = useSession();
    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [searchInput, setSearchInput] = useState("");

    const credentials = [
        {
            "id": 1,
            "site": {
                "id": 1,
                "name": "Google",
                "url": "https://www.google.com",
                "icon": "google_icon.png"
            },
            "nickname": "Gugu",
            "username": "anasgomezd",
            "email": "anasgomezd@gmail.com",
            "password": "cualquiera",
            "category": "Social",
            "favorite": false,
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "notes": "Esta te la puse yo miamor. Estas son como notitas que pdoes gruardar y tambine estan encryptadas asi que son super seguras"
        },
        {
            "id": 2,
            "site": {
                "id": 2,
                "name": "Facebook",
                "url": "https://www.facebook.com",
                "icon": "facebook_icon.png"
            },
            "nickname": "Face",
            "username": "anapoopis",
            "email": "anasgomezd@gmail.com",
            "password": "facepass",
            "category": "Social",
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "favorite": true,
            "notes": ""
        },
        {
            "id": 3,
            "site": {
                "id": 3,
                "name": "Twitter",
                "url": "https://www.twitter.com",
                "icon": "twitter_icon.png"
            },
            "nickname": "Ay X",
            "username": "anita_la_huerfanita",
            "email": "anasgomezd@gmail.com",
            "password": "twitter_pass_!",
            "category": "Social",
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "favorite": false,
            "notes": "Test Notes"
        }
    ];

    const onSelectedCredential = (credential: CredentialEntry) => {
        // If selected credential is the same as the one clicked, then deselect it
        if (selectedCredential && credential.id === selectedCredential.id) {
            console.log("Deselecting credential")
            setSelectedCredential(null);
            return;
        }
        // Else set the new selected credential
        setSelectedCredential(credential);
    };

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setSearchInput(value);
        } else {
            setSearchInput('');
        }
    }, []);

    const onClear = useCallback(() => {
        setSearchInput("")
    }, [])

    // If the user is not logged in, show the login modal
    if (!session || !session.user) {
        return (
            <div className="flex flex-col h-full w-full bg-gray-300 gap-y-2">
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
        <main className="flex flex-col h-full justify-between bg-gray-300">
            <TopNavbar
                currentSearchValue={searchInput}
                onSearchChange={onSearchChange}
                onClear={onClear}
            />
            <div className="flex h-full justify-between bg-gray-300">
                <div
                    className={`transition-width duration-300 ease-in-out ${selectedCredential ? 'w-2/3' : 'w-full'}  h-full bg-gray-300 rounded-2xl`}>
                    <CredentialTable
                        dataColumns={columns}
                        data={credentials}
                        selectedCredential={selectedCredential}
                        onCredentialSelect={onSelectedCredential}
                        searchInput={searchInput}
                    />
                </div>
                <div
                    className={`relative right-0 bg-gray-400 transition-all duration-200 ease-in-out ${selectedCredential ? "w-1/3 m-4 ml-0 p-2" : "w-0"}  rounded-2xl`}>
                    {/* Details for a selected credential */}
                    <CredentialDetails credential={selectedCredential}/>
                </div>
            </div>
        </main>
    );
}
