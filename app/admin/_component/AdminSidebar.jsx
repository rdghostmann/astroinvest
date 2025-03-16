"use client";

import * as React from "react";
import {
  ArrowDownToLine,
  ChartNoAxesCombined,
  CircleDollarSign,
  Command,
  CreditCard,
  HandCoins,
  IdCard,
  Landmark,
  LayoutDashboard,
  LifeBuoy,
  Send,
  SquareMenu,
  TvMinimal,
  Users,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavAdmin } from "./NavAdmin";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const adminData = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
      isActive: true,
    },
    {
      title: "Users",
      icon: Users,
      url: "/admin/users",
    },
    {
      title: "Approve KYC",
      icon: IdCard,
      url: "/admin/approve-kyc",
    },
    {
      title: "User Top Up",
      icon: HandCoins,
      url: "/admin/topup-user",
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AdminSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AstroInvest</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminData.navMain} />
        <NavSecondary items={adminData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavAdmin />
      </SidebarFooter>
    </Sidebar>
  );
}