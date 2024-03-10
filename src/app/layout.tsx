import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/session_provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyvault",
  description: "Secure credential storage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await getServerSession();

    return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
