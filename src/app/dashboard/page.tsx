"use client";

import {useCallback, useMemo, useState} from "react";
import CredentialTable from "@/components/dashboard/CredentialTable";
import CredentialDetails from "@/components/dashboard/CredentialDetails";
import TopNavbar from "@/components/navigation/navbar";

const columns = [
    {label: "SITE", key: "site", sortable: true},
    {label: "NICKNAME", key: "nickname", sortable: true},
    {label: "FAVORITE", key: "favorite", sortable: true},
];

export default function Dashboard() {

    const credentials = [
        {
            "id": 1,
            "site": {
                "id": 1,
                "name": "Google",
                "url": "https://www.google.com",
                "icon": "google_icon.png"
            },
            "nickname": "Nickname1",
            "username": "testuser",
            "email": "test@gmail.com",
            "password": "testpassword",
            "category": "Social",
            "favorite": false,
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "notes": "Test Notes"
        },
        {
            "id": 2,
            "site": {
                "id": 2,
                "name": "Facebook",
                "url": "https://www.facebook.com",
                "icon": "facebook_icon.png"
            },
            "nickname": "Test Nickname",
            "username": "testuser",
            "email": "test@gmail.com",
            "password": "testpassword",
            "category": "Social",
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "favorite": true,
            "notes": "Test Notes"
        },
        {
            "id": 3,
            "site": {
                "id": 3,
                "name": "Twitter",
                "url": "https://www.twitter.com",
                "icon": "twitter_icon.png"
            },
            "nickname": "Test Nickname",
            "username": "testuser",
            "email": "test@gmail.com",
            "password": "testpassword",
            "category": "Social",
            "modified_at": "2021-10-10T12:00:00Z",
            "created_at": "2021-10-10T12:00:00Z",
            "favorite": false,
            "notes": "Test Notes"
        }
    ];

    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [searchInput, setSearchInput] = useState("");

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

    const onClear = useCallback(()=>{
        setSearchInput("")
    },[])

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
