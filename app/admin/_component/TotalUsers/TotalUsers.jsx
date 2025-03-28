import React from "react";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User"; // Assuming you have a User model
import { Users } from 'lucide-react';

// Server function to count total users
async function getTotalUsers() {
  await connectToDB();

  try {
    const totalUsers = await User.countDocuments(); // Count all users in the database
    return totalUsers;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0; // Return 0 in case of an error
  }
}

const TotalUsers = async () => {
  const totalUsers = await getTotalUsers(); // Fetch total users from the database

  return (
    <div className="p-4 border rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Total Users</h3>
        <p className="text-lg font-semibold text-gray-900">{totalUsers}</p>
      </div>
      <div className="text-blue-500">
      <Users />
      </div>
    </div>
  );
};

export default TotalUsers;