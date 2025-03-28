import React from "react";
import mongoose from "mongoose";
import { ArrowUpRight } from "lucide-react";
import { connectToDB } from "@/lib/connectDB";
import Investment from "@/models/Investment"; // Assuming you have the Investment model

// Server action to calculate total profit for a user
async function getUserProfits(userID) {
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
    console.error("Error fetching user profits:", error);
    return 0; // Return 0 in case of an error
  }
}

const UserProfit = async ({ userID }) => {
  const userTotalProfit = await getUserProfits(userID); // Fetch the total profit for the user

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl text-black font-bold md:text-3xl">${userTotalProfit}</h2>
      <span className="flex items-center text-sm text-green-500">
        <ArrowUpRight className="h-4 w-4" />
        {/* Example: Add a percentage change or static value */}
        1.25%
      </span>
    </div>
  );
};

export default UserProfit;