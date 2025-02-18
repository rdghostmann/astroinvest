// app/controllers/FetchUserData/route.js
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { connectToDB } from "@/lib/connectDB";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  // Retrieve the session from the server
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    await connectToDB();
    // Use the session's user id to fetch user data.
    const userId = session.user.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
   
    return NextResponse.json({
      userID: user.userID,
      username: user.username,
      email: user.email,
      walletBalance: user.walletBalance,
      profitTotal: user.profitTotal,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    revalidatePath("/dashboard")
  };
}
