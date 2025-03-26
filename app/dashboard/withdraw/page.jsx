import { AppSidebar } from "@/components/app-sidebar"
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
import CryptoWithdraw from "./CryptoWithdraw";
import BankWithdraw from "./BankWithdraw";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


export default async function Page() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Withdraw</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5 mb-2 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-purple-600 font-bold text-xl">Withdraw Funds</h2>
            <p className="text-slate-700">Get swift withdrawal to your Account</p>
          </div>

          <div className="w-full flex gap-5 lg:gap-10 flex-col lg:flex-row">
            <CryptoWithdraw userID={userID} />

            <BankWithdraw userID={userID} />
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
