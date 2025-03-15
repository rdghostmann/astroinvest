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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { fetchInvestmentByUser } from "@/lib/actions"; // Import the server action

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch investments made by the user
  const investments = await fetchInvestmentByUser(userID);

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
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Investment History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5">
            <h2 className="text-purple-600 font-bold text-xl">Investment History</h2>
            <p className="text-slate-700">Find all your Investments with AstroInvest here</p>
          </div>
          <div className="grid grid-col-1">
            {/* Deposit List  */}
            <div className="flex flex-col overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="rounded-t-lg overflow-x-auto border">
                    {investments.length > 0 ? (
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-blue-950/50 hover:bg-blue-900/50">
                            <TableHead className="text-blue-100 px-6 py-4">Transaction ID</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Date</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Amount</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Plan Name</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Profit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {investments.map((investment) => (
                            <TableRow key={investment._id} className="border-b hover:bg-blue-900/20">
                              <TableCell className="text-gray-600 px-6 py-4">{investment._id}</TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">{new Date(investment.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">${investment.amount.toLocaleString()}</TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">{investment.planName}</TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">${investment.profit.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-4 text-center text-gray-600">No Investments found</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}