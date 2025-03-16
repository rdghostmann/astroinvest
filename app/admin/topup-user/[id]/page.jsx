import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import UsersCard from './UsersCard';

import { getUserById, updateUserWallet } from '@/lib/actions'; // Import the server actions
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminSidebar } from '../../_component/AdminSidebar';

const page = async () => {
  const { id } = params;


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
                  <BreadcrumbPage>Top User's Wallet</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-1 p-4 pt-0">
          {/* Left Section */}
          {/* <div className="flex-1 space-y-6 basis-0"> */}
          {/* Portfolio Overview */}
          {/* <h2 className="text-lg font-semibold">TopUp Users</h2> */}
          {/* </div> */}
          <div>
            <h2 className="font-semibold">User Wallets</h2>
            <p>User ID: {id}</p>

          </div>


        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default page

