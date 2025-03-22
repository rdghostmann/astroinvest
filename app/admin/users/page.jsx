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

import UsersTable from '../_component/UsersTable';
import { getAllUsers } from '@/lib/actions';
import { AdminSidebar } from '../_component/AdminSidebar';

const page = async () => {
  const users = await getAllUsers();
  const plainUsers = users.map(user => ({
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone,
    country: user.country,
    state: user.state,
    role: user.role,
    isVerified: user.isVerified,
  }));

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
                  <BreadcrumbPage>Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-1 p-4 pt-0">
          <div>
            <UsersTable users={plainUsers} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default page;