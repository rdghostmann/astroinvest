import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getTotalDeposit } from "@/lib/actions"; // Import the server action to fetch the total deposit

const TotalDeposit = async () => {
  // Get the current user's session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="bg-amber-800/50 p-3 rounded-lg">
        <p className="text-lg font-semibold">$0.00</p>
        <p className="text-xs text-amber-200">Total Deposits</p>
      </div>
    );
  }

  // Fetch the user's total deposit amount
  const totalDeposit = await getTotalDeposit(session.user.id);

  return (
    <div className="bg-amber-800/50 p-3 rounded-lg">
      <p className="text-lg font-semibold">${totalDeposit || "0.00"}</p>
      <p className="text-xs text-amber-200">Total Deposits</p>
    </div>
  );
};

export default TotalDeposit;