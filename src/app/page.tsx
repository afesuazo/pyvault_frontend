"use client";
import Header from "@/components/landing_page/header";
import MainContent from "@/components/landing_page/main_content";
import Features from "@/components/landing_page/features";
import {useState} from "react";

export default function Home() {

    const [isLockHovered, setIsLockHovered] = useState(false);

    return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <Header/>
        <MainContent isLockHovered={isLockHovered} setIsLockHovered={setIsLockHovered} />
        <Features isLockHovered={isLockHovered} />
    </main>
  );
}
