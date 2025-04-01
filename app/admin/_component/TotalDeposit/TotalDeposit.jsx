import React from "react";
import { connectToDB } from "@/lib/connectDB";
import Deposit from "@/models/Deposit"; // Assuming you have a Deposit model
import { HandHelping } from "lucide-react";

// Server function to calculate total deposits
async function getTotalDepositData() {
  await connectToDB();

  try {
    // Aggregate the total number of approved deposits and their sum
    const result = await Deposit.aggregate([
      { $match: { status: "approved" } }, // Match deposits with status === "approved"
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }, // Sum the deposit amounts
          totalCount: { $sum: 1 }, // Count the number of deposits
        },
      },
    ]);

    // Return the total amount and count, or fallback values if no deposits are found
    return result.length > 0
      ? { totalAmount: result[0].totalAmount, totalCount: result[0].totalCount }
      : { totalAmount: 0, totalCount: 0 };
  } catch (error) {
    console.error("Error fetching total deposit data:", error);
    return { totalAmount: 0, totalCount: 0 }; // Return fallback values in case of an error
  }
}

const TotalDeposit = async () => {
  const { totalAmount, totalCount } = await getTotalDepositData(); // Fetch total deposit data

  return (
    <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">Total Deposit</h3>
        <p className="text-lg font-semibold text-gray-900">${totalAmount}</p>
        <p className="text-sm text-gray-600">{totalCount} Approved Deposits</p>
      </div>
      <div className="text-green-500">
        <HandHelping className="h-10 w-10" />
      </div>
    </div>
  );
};

export default TotalDeposit;