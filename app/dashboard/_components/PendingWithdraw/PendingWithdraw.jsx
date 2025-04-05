import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { connectToDB } from "@/lib/connectDB";
import Investment from "@/models/Investment"; // Assuming you have the Investment model

// Server action to get the last profit for the current user
async function getLastProfit(userID) {
  await connectToDB();

  try {
    // Find the most recent investment for the user
    const lastInvestment = await Investment.findOne({ userID })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .lean();

    // Return the profit or 0 if no investment is found
    return lastInvestment?.profit || 0;
  } catch (error) {
    console.error("Error fetching last profit:", error);
    return 0; // Return 0 in case of an error
  }
}

const PendingWithdrawal = async () => {
  // Get the current user's session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="bg-gray-100 p-3 rounded-lg  shadow-black shadow-md">
        <p className="text-lg font-semibold">$0.00</p>
        <p className="text-xs text-red-200">Pending Withdraw</p>
      </div>
    );
  }

  // Fetch the last profit for the current user
  const lastProfit = await getLastProfit(session.user.id);

  return (
    <div className="bg-gray-100 p-3 rounded-lg  shadow-black shadow-md">
      <p className="text-lg font-semibold">${lastProfit.toFixed(2)}</p>
      <p className="text-xs text-red-600">Pending Withdraw</p>
    </div>
  );
};

export default PendingWithdrawal;