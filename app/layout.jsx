import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import Tawk from "@/components/Tawk/Tawk";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AstroInvest",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // Fetch the session from the server
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        <SessionProviderWrapper session={session}>
          {children}
        </SessionProviderWrapper>
        <Toaster />
        <Tawk />
      </body>
    </html>
  );
}