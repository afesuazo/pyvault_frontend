"use client";

import {useState} from "react";

export default function Dashboard() {

    const [selectedPassword, setSelectedPassword] = useState<boolean>(true)

    const passwords = [
        {
            "id": 1,
            "site": {
                "id": 1,
                "name": "Google",
                "url": "https://www.google.com",
                "icon": "google_icon.png"
            },
            "username": "testuser",
            "password": "testpassword",
            "category": "Social",
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
            "username": "testuser",
            "password": "testpassword",
            "category": "Social",
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
            "username": "testuser",
            "password": "testpassword",
            "category": "Social",
            "notes": "Test Notes"
        }
    ];

    const toggleDetailsPanel = () => {
        setSelectedPassword(!selectedPassword);
    };

    return (
        <main className="flex flex-row h-screen justify-between p-2 bg-gray-200">
            <div
                className={`transition-width duration-500 ease-in-out ${selectedPassword ? 'w-2/3' : 'w-full'} h-full bg-emerald-400 rounded-2xl p-6`}>
                {/* Passwords Table and Filters */}
                <button
                    className="p-2 rounded-2xl bg-blue-500"
                    onClick={toggleDetailsPanel}>
                    Toggle
                </button>
            </div>
            <div
                className={`transition-all duration-200 ease-in-out ${selectedPassword ? 'flex-grow p-6' : 'w-0'} h-full bg-opacity-0 bg-emerald-200`}>
                {/* Details for a selected credential */}
            </div>


        </main>
    );
}
