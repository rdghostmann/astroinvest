import mongoose from "mongoose";
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
import CryptoWithdraw from "./CryptoWithdraw";
import BankWithdraw from "./BankWithdraw";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { connectToDB } from "@/lib/connectDB";
import Investment from "@/models/Investment"; // Assuming you have the Investment model

// Server function to calculate the total withdrawable balance
async function getWithdrawBalance(userID) {
  await connectToDB();

  try {
    // Aggregate the total profit for the user
    const result = await Investment.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userID) } }, // Match investments for the given user
      { $group: { _id: null, totalProfit: { $sum: "$profit" } } }, // Sum the profit field
    ]);

    // Return the total profit or 0 if no investments are found
    return result.length > 0 ? result[0].totalProfit : 0;
  } catch (error) {
    console.error("Error fetching withdraw balance:", error);
    return 0; // Return 0 in case of an error
  }
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userID = session?.user?.id;

  // Fetch the available balance for the current user
  const availableBalance = userID ? await getWithdrawBalance(userID) : 0;

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

          {/* Available Balance */}
          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="w-full">
              <p className="text-sm text-gray-500">Available Balance:</p>
              <input
                placeholder="$0"
                value={`$${availableBalance.toFixed(2)}`}
                type="text"
                className="bg-transparent p-2 rounded w-full"
                disabled
              />
            </div>
          </div>

          <div className="w-full flex gap-5 lg:gap-10 flex-col lg:flex-row">
            <CryptoWithdraw userID={userID} />
            <BankWithdraw userID={userID} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}