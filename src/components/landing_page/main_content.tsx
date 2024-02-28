"use client";
import React, {useEffect, useState} from "react";
import {LockClosedIcon, LockOpenIcon} from '@heroicons/react/24/outline';
import Link from "next/link";

const MainContent = ({isLockHovered, setIsLockHovered}: MainContentProps) => {

    const [isEnabledColorActive, setIsEnabledColorActive] = useState(false);

    useEffect(() => {
        // When lock has been hovered for 1 second apply effects
        if (isLockHovered) {
            const timer = setTimeout(() => {
                setIsEnabledColorActive(true);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setIsEnabledColorActive(false);
        }
    }, [isLockHovered]);

    return (
        <div className="flex flex-grow justify-between items-stretch w-full my-12">

            <div className="px-14 w-1/2 flex flex-grow flex-col justify-center wrap">
                <h2 className="text-6xl lg:text-8xl font-bold mb-4">Secure Your Digital Life</h2>
                <p className="text-lg lg:text-2xl">Your one-stop solution for managing digital credentials securely.</p>
            </div>

            <div
                className={`drop-shadow-lg rounded-l-full flex w-1/2 my-16 items-center transition-width duration-700 ease-in-out ${isEnabledColorActive ? 'bg-green-500' : 'bg-gray-200'}`}>
                <div className="relative flex w-full h-2/3 justify-center items-center"
                     onMouseEnter={() => setIsLockHovered(true)}
                     onMouseLeave={() => setIsLockHovered(false)}
                >
                    <div className="text-center z-10">
                        {isLockHovered ?
                            <LockClosedIcon className="h-24 w-24 mx-auto"/> :
                            <LockOpenIcon className="h-24 w-24 mx-auto"/>
                        }
                        <Link href="/dashboard" className="text-2xl font-semibold mt-4">Enter App</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainContent;