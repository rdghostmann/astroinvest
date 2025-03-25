'use client'
import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from './_component/AdminSidebar';
import { getAllUsers, findUserWallets } from '@/lib/actions'; // Import the functions to fetch total users and total balance

const Page = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setTotalUsers(users.length);

      const wallets = await findUserWallets();
      const balance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
      setTotalBalance(balance);
    };

    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    AstroInvest
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Card for Total Users */}
            <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Total Users</h3>
                <p className="text-lg font-semibold text-gray-900">{totalUsers}</p>
              </div>
              <div className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.121 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM19 10a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            {/* Card for Total Balance */}
            <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Total B</h3>
                <p className="text-lg font-semibold text-gray-900">${totalBalance.toLocaleString()}</p>
              </div>
              <div className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </div>
            </div>
            {/* Add more cards for other statistics as needed */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
