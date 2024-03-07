"use client";

import {useState} from "react";
import CredentialTable from "@/components/dashboard/CredentialTable";

export default function Dashboard() {

    const [selectedCredentials, setSelectedCredentials] = useState<boolean>(true)

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
            "password": "testpassword",
            "category": "Social",
            "favorite": false,
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
            "password": "testpassword",
            "category": "Social",
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
            "password": "testpassword",
            "category": "Social",
            "favorite": false,
            "notes": "Test Notes"
        }
    ];

    const toggleDetailsPanel = () => {
        setSelectedCredentials(!selectedCredentials);
    };

    return (
        <main className="flex flex-row h-screen justify-between p-2 bg-gray-200">
            <div
                className={`transition-width duration-500 ease-in-out ${selectedCredentials ? 'w-2/3' : 'w-full'} h-full bg-emerald-400 rounded-2xl`}>
                {/* Passwords Table and Filters */}
                <button
                    className="p-2 rounded-2xl bg-blue-500"
                    onClick={toggleDetailsPanel}>
                    Toggle
                </button>
                <CredentialTable data={credentials}/>
            </div>
            <div
                className={`transition-all duration-200 ease-in-out ${selectedCredentials ? 'flex-grow p-6' : 'w-0'} h-full bg-opacity-0 bg-emerald-200`}>
                {/* Details for a selected credential */}
            </div>
        </main>
    );
}
