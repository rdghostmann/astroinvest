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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { connectToDB } from "@/lib/connectDB";
import Withdrawal from "@/models/Withdrawal"; // Assuming you have the Withdrawal model

// Server function to fetch withdrawal history for the current user
async function getWithdrawalHistory(userID) {
  await connectToDB();

  try {
    // Find all withdrawal requests for the user
    const withdrawals = await Withdrawal.find({ userId: userID })
      .sort({ createdAt: -1 }) // Sort by most recent
      .lean();

    return withdrawals;
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);
    return []; // Return an empty array in case of an error
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch withdrawal history for the current user
  const withdrawals = userID ? await getWithdrawalHistory(userID) : [];

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
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Withdrawal History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5">
            <h2 className="text-purple-600 font-bold text-xl">Withdrawal History</h2>
            <p className="text-slate-700">Find all your withdrawals with AstroInvest here</p>
          </div>
          <div className="grid grid-col-1">
            {/* Withdrawal List */}
            <div className="flex flex-col overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="rounded-t-lg overflow-x-auto border">
                    {withdrawals.length > 0 ? (
                      <Table className="min-w-full text-start text-sm font-light">
                        <TableHeader>
                          <TableRow className="bg-blue-950/50 hover:bg-blue-900/50">
                            <TableHead className="text-blue-100 px-6 py-4">Date</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Amount</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Wallet</TableHead>
                            <TableHead className="text-blue-100 px-6 py-4">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withdrawals.map((withdrawal) => (
                            <TableRow key={withdrawal._id} className="border-b hover:bg-blue-900/20">
                              <TableCell className="text-gray-600 px-6 py-4">
                                {new Date(withdrawal.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">
                                ${withdrawal.requestedAmount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-gray-600 px-6 py-4">
                                {withdrawal.withdrawWallet}
                              </TableCell>
                              <TableCell className="text-gray-600 px-6 py-4 capitalize">
                                {withdrawal.status}
                              </TableCell>
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
    </SidebarProvider>
  );
}