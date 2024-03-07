"use client";

import {useState} from "react";

export default function Dashboard() {

    const [selectedPassword, setSelectedPassword] = useState<boolean>(true)

    const passwords= [
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

    return (
        <main className="flex flex-row h-screen justify-between p-2 ">
            <div className="w-full h-full bg-emerald-400 rounded-2xl">
            {/* Passwords Table and Filters */}
            </div>
            {selectedPassword &&
                <div className="w-1/3 h-full border-l bg-emerald-200 rounded-2xl">
                    {/*  Details for a selected credential */}
                </div>
            }
        </main>
    );
}
