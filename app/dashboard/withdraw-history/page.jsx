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


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
  const withdrawals = [
    {
      id: "1",
      transactionId: "30490eDriYCJso2sX9w0",
      date: "Nov-3-2021",
      amount: 3600,
      currency: "SOL",
    },
    {
      id: "2",
      transactionId: "30490eDriYCJso2sX9w0",
      date: "Nov-3-2021",
      amount: 5200,
      currency: "BTC",
    },
    {
      id: "3",
      transactionId: "30490eDriYCJso2sX9w0",
      date: "Nov-3-2021",
      amount: 2800,
      currency: "ETH",
    },
  ];
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
                  <BreadcrumbPage>Desposit History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5">
            <h2 className="text-purple-600 font-bold text-xl">Withdrawal History</h2>
            <p className="text-slate-700">Find all your Withdrawal with AstroInvest here</p>
          </div>
          <div className="grid grid-col-1">
            {/* Withdrawal List  */}
            <div className="flex flex-col overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="rounded-t-lg overflow-x-auto border">
                    {withdrawals.length > 0 ? (
                      <Table className="min-w-full text-start text-sm font-light">
                        <TableHeader>
                          <TableRow className="bg-blue-950/50 hover:bg-blue-900/50">
                            <TableHead className="text-blue-100 px-6 py-4">Transaction ID</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Date</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Amount</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Currency</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withdrawals.map((withdrawal) => (
                            <TableRow key={withdrawal._id} className="border-b hover:bg-blue-900/20">
                              <TableCell className="text-gray-600">{withdrawal.withdrawalNumber}</TableCell>
                              <TableCell className="text-gray-600">{new Date(withdrawal.date).toLocaleDateString()}</TableCell>
                              <TableCell className="text-gray-600">${withdrawal.amount.toLocaleString()}</TableCell>
                              <TableCell className="text-gray-600">{withdrawal.assetName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="p-4 text-center text-gray-600">No Withdrawals found</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
