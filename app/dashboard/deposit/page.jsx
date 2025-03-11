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
import { fetchAssets } from "@/controllers/FetchAssets";
import DepositForm from "./DepositForm";
import SwiftDeposit from "./SwiftDeposit";

export default async function Page() {
  const assets = await fetchAssets();

  const assetData = assets.map(({ name, depositAddress }) => ({
    name, depositAddress
  }));

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
                  <BreadcrumbPage>Make Desposit</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5 mb-2 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-purple-600 font-bold text-xl">Deposit Funds to Wallet</h2>
            <p className="text-slate-700">Top up your Account Balance Instantly</p>
          </div>

          <div className="w-full lg:w-1/3 space-y-6 basis-0">
            {/* Pass assets as props */}
            <SwiftDeposit assets={assetData} />
            {/* <DepositForm assets={assetData} /> */}
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>)
  );
}
