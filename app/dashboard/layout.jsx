// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AstroInvest | Dashboard",
  description: "Generated by create next app",
};

export default async function DashboarddRootLayout({ children }) {

  return (
    <div suppressHydrationWarning>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} cz-shortcut-listen="true" suppressHydrationWarning>
        {children}
        <Toaster />
      </div>
    </div>
  );
}
