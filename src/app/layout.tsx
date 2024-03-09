import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {NextUIProvider} from "@nextui-org/react";
import TopNavbar from "@/components/navigation/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyvault",
  description: "Secure credential storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className} flex flex-col h-screen`}>
      {children}
    </body>
    </html>
  );
}
