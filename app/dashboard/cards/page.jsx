import { AppSidebar } from "@/components/app-sidebar";
import CardDetail from "@/components/CardDetail/CardDetail";
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
import { getSession } from "next-auth/react";

export default async function Page() {
  const session = await getSession();
  const userID = session?.user?.id;

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
                  <BreadcrumbLink href="#">
                    Investment & Deposit
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manage Card</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5 mb-2 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-purple-600 font-bold text-xl">Add Card</h2>
            <p className="text-slate-700">Add Card for Instant Funding</p>
          </div>

          <div className="w-full basis-0">
            <CardDetail userID={userID} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}