"use server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export default async function getAllUser() {
  try {
    await connectToDB();
    
    // Fetch only required fields
    const users = await User.find({}, "userID name email walletBalance totalPrice");

    // Convert all values to strings
    const sanitizedUsers = users.map(user => ({
      id: user._id.toString(),  // Convert _id to string
      userID: user.userID,
      name: user.name,
      email: user.email,
      walletBalance: user.walletBalance,
      totalPrice: user.totalPrice,
      createdAt: user.createdAt.toISOString(), // Use ISO format for date
      updatedAt: user.updatedAt.toISOString(), // Use ISO format for date
    }));

    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  } finally {
    revalidatePath("/admin");
  }
}


  // Cache the response for 1 hour
  // revalidatePath("/admin", {
  //   staleWhileRevalidate: {
  //     duration: 60 * 60, // 1 hour
  //   },
  // });