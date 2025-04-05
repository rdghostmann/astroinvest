
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getLastDeposit } from "@/lib/actions"; // Import the server action to fetch the last deposit

const ActiveDeposit = async () => {
  // Get the current user's session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="bg-blue-300 p-3 rounded-lg">
        <p className="text-lg font-semibold">$0.00</p>
        <p className="text-xs text-amber-200">Active Deposits</p>
      </div>
    );
  }

  // Fetch the user's last deposit amount
  const lastDeposit = await getLastDeposit(session.user.id);

  return (
    <div className="bg-gray-100 p-3 rounded-lg  shadow-black shadow-md"> 
      <p className="text-lg font-semibold">${lastDeposit || "0.00"}</p>
      <p className="text-xs text-green-600">Active Deposits</p>
    </div>
  );
};

export default ActiveDeposit;