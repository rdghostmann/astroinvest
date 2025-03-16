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
import LogOutBtn from '@/components/LogOut/LogOutBtn'
import { AdminSidebar } from './_component/AdminSidebar'

const page = () => {
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
          {/* Left Section */}
          <div className="flex-1 space-y-6 basis-0">
            {/* Portfolio Overview */}
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <div>
            {/* div with icon of user and total number of Users */}
            <div></div>
            {/* div with icon of user and total number of Wallets */}
            <div></div>
            {/* div with icon of user and total number of Investment */}
            <div></div>
            {/* div with icon of user and total number of Approved KYC */}
            <div></div>
            {/* div with icon of user and total number of Deposit */}
            <div></div>
            {/* div with icon of user and total number of Withdrawal */}
            <div></div>

          </div>


        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default page
