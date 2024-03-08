"use client";

import {useState} from "react";
import CredentialTable from "@/components/dashboard/CredentialTable";
import CredentialDetails from "@/components/dashboard/CredentialDetails";
import CredentialTableHeader from "@/components/dashboard/CredentialTableHeader";

export default function Dashboard() {

    const [selectedCredential, setSelectedCredential] = useState<CredentialEntry | null>(null)
    const [nicknameSearchInput, setNicknameSearchInput] = useState('');

    const credentials = [
        {
            "id": 1,
            "site": {
                "id": 1,
                "name": "Google",
                "url": "https://www.google.com",
                "icon": "google_icon.png"
            },
            "nickname": "Test Nickname",
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

    const onSelectedCredential = (credential: CredentialEntry) => {
        console.log(credential);

        // If selected credential is the same as the one clicked, then deselect it
        if (selectedCredential && credential.id === selectedCredential.id) {
            setSelectedCredential(null);
            return;
        }

        // Else set the new selected credential
        setSelectedCredential(credential);
    }

    // Filtered credentials based on all filters
    const filteredCredentials = credentials.filter(credential =>
            credential.nickname.toLowerCase().includes(nicknameSearchInput.toLowerCase())
    );

    return (
        <main className="flex h-screen justify-between bg-gray-300">
            <div
                className={`transition-width duration-300 ease-in-out ${selectedCredential ? 'w-2/3' : 'w-full'} h-full bg-gray-300 rounded-2xl`}>
                {/* Passwords Table and Filters */}
                <CredentialTableHeader
                    onSearch={(searchTerm) => setNicknameSearchInput(searchTerm)}
                />
                <CredentialTable
                    data={filteredCredentials}
                    selectedCredential={selectedCredential}
                    onCredentialSelect={onSelectedCredential}
                />
            </div>
            <div
                className={`relative right-0 bg-gray-400 transition-all duration-200 ease-in-out ${selectedCredential ? "w-1/3 m-4 ml-0 p-2" : "w-0" }  rounded-2xl`}>
                {/* Details for a selected credential */}
                <CredentialDetails credential={selectedCredential} />
            </div>
        </main>
    );
}
