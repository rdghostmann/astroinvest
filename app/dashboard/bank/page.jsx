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

export default function Page() {
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
                  <BreadcrumbPage>Bank</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5">
            <h2 className="text-purple-600 font-bold text-xl">Manage Bank</h2>
            <p className="text-slate-700">Manage Where your money goes to</p>
          </div>
          <div>
            {/* Bank details  */}
            <div className="max-w-3xl md:w-screen mx-auto overflow-x-scroll my-6 bg-white shadow-md p-4 rounded-lg  ">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-600 text-sm/5">
                    <th>#</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Bank Address</th>
                    <th>Routing Number</th>
                    <th>Swift Code</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>

                  </tr>
                </tbody>
              </table>
            </div>



            {/* Add Details */}
            <div className="mb-2 bg-white shadow-md p-4 rounded-lg">


              {/* Add Bank Section */}
              <AddBank /> {/* Use AddBank component */}

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
