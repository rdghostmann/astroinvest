"use server";
import { connectToDB } from "@/lib/connectDB";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export default async function getAllUser() {
  try {
    await connectToDB();
    
    // Fetch only required fields
    const users = await User.find({}, "_id userID username email walletBalance totalPrice");

    // Convert MongoDB documents to plain JavaScript objects and transform `_id`
    const sanitizedUsers = users.map(user => ({
      id: user._id.toString(), // Convert _id to string
      userID: user.userID,
      name: user.username,
      email: user.email,
      walletBalance: user.walletBalance,
      totalPrice: user.totalPrice,
    }));
    
    console.log(sanitizedUsers);
        
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