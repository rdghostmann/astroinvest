"use server";

import User from "@/models/User"; // Import your User model
import { connectToDB } from "@/lib/connectDB"; // Import your database connection logic

export async function checkUserStatus(email) {
  try {
    // Connect to the database
    await connectToDB();

    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Check the user's status
    if (user.status === "inactive") {
      return {
        success: false,
        message: "Contact support for further assistance. User's account is inactive.",
      };
    }

    if (user.status === "active") {
      return { success: true, message: "Login successful" };
    }

    // Handle other statuses if needed
    return { success: false, message: "Unexpected user status" };
  } catch (error) {
    console.error("Error checking user status:", error);
    return { success: false, message: "An error occurred while checking user status" };
  }
}