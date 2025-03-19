"use client";
import React, { useEffect, useState } from "react";
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
import { AdminSidebar } from "../_component/AdminSidebar";
import KycCard from "./KycCard";
import { fetchKycUsers, fetchAllKycRecords } from "@/lib/actions"; // Import the separate functions

const Page = () => {
  const [users, setUsers] = useState([]);
  const [kycRecords, setKycRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchKycUsers();
      const kycData = await fetchAllKycRecords();
      setUsers(usersData);
      setKycRecords(kycData);
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
                  <BreadcrumbLink href="#">AstroInvest</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>ApproveKYC</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-1 p-4 pt-0">
          <h2 className="text-lg font-semibold">KYC Approvals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {users.map(user => {
              const userKyc = kycRecords.find(kyc => kyc.user_id === user._id);
              return <KycCard key={user._id} user={user} kyc={userKyc} />;
            })}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
