import React from "react";
import { getTotalUserWalletBalance } from "@/lib/actions";
import { ArrowUpRight } from "lucide-react";

const TotalUserBalance = async ({ userID }) => {
  const totalBalance = await getTotalUserWalletBalance(userID);

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl text-black font-bold md:text-3xl">${totalBalance}</h2>
      <span className="flex items-center text-sm text-green-500">
        <ArrowUpRight className="h-4 w-4" />
        1.25%
      </span>
    </div>
  );
};

export default TotalUserBalance;