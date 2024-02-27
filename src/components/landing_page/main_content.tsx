"use client";
import React, {useEffect, useState} from "react";
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const MainContent = ({ isLockHovered, setIsLockHovered } : MainContentProps) => {

    const [isEnabledColorActive, setIsEnabledColorActive] = useState(false);

    useEffect(() => {
        // Wait for the lock to be hovered for 1 second before hiding the text
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

            <div className={`rounded-l-full flex w-1/2 my-16 items-center transition-width duration-700 ease-in-out ${isEnabledColorActive ? 'bg-green-500' : 'bg-white'}`}>
                <div className="relative flex w-full h-2/3 justify-center items-center"
                     onMouseEnter={() => setIsLockHovered(true)}
                     onMouseLeave={() => setIsLockHovered(false)}
                >
                    {/* Circle behind the lock */}
                    {/*<div className={`absolute rounded-full -z-1 transition-all duration-300 ${isLockHovered ? 'w-[600px] h-[600px] bg-green-500' : 'w-[550px] h-[550px] bg-red-500'}`}></div>*/}

                    {/* Lock Icon */}
                    <div className="text-center z-10">
                        {isLockHovered ?
                            <LockClosedIcon className="h-24 w-24 mx-auto"/> :
                            <LockOpenIcon className="h-24 w-24 mx-auto"/>
                        }
                        <p className="text-2xl font-semibold mt-4">Enter App</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainContent;