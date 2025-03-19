import { AppSidebar } from "@/components/app-sidebar";
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

import InvestForm from "./InvestForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { findUserWallets } from "@/lib/actions";


export default async function Page() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch wallets made by the user
  const wallets = await findUserWallets(userID);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Investment & Deposit</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Investment</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="w-full flex flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5 mb-2 bg-white p-3 shadow-md rounded-lg">
            <h2 className="text-purple-600 font-bold text-xl">Investment Plans</h2>
            <p className="text-slate-700">Investment that Guarantee Wealth</p>
          </div>
          {/* Pass the fetched wallets as props */}
          <InvestForm wallets={wallets} userID={userID} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}