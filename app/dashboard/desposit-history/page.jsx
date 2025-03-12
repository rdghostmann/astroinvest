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
import { fetchDepositsByUser } from "@/lib/actions"; // Import the server action
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth";

export default async function Page() {
   const session = await getServerSession(authOptions)
    const userID = session?.user?.id;

  // Fetch deposits made by the user
  const deposits = await fetchDepositsByUser(userID);

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
                  <BreadcrumbPage>Deposit History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5">
            <h2 className="text-purple-600 font-bold text-xl">Deposit History</h2>
            <p className="text-slate-700">Find all your Deposits with AstroInvest here</p>
          </div>
          <div className="w-full min-w-xs mx-auto px-0 lg:px-10">
            <div className="rounded-t-lg overflow-x-auto border">
              {deposits.length > 0 ? (
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-blue-950/50 hover:bg-blue-900/50">
                      <TableHead className="text-blue-100">Transaction ID</TableHead>
                      <TableHead className="text-blue-100">Date</TableHead>
                      <TableHead className="text-blue-100">Amount</TableHead>
                      <TableHead className="text-blue-100">Currency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deposits.map((deposit) => (
                      <TableRow key={deposit._id} className="border-b hover:bg-blue-900/20">
                        <TableCell className="text-gray-600">{deposit.depositNumber}</TableCell>
                        <TableCell className="text-gray-600">{new Date(deposit.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-gray-600">${deposit.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-600">{deposit.assetName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center text-gray-600">No Deposits made</div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}