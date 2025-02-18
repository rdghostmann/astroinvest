"use server";

import { put } from "@vercel/blob";
import { connectToDB } from "@/lib/connectDB";
import Deposit from "@/models/Deposit";

export async function depositUpload(formData) {


  try {
    const userId = user.id;
    const file = formData.get("file");
    const asset = formData.get("assetId"); // Ensure this is correctly received
    const amount = formData.get("amount");

    // console.log("FormData entries:");
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    
    const assetId = asset.toString();

    if (!file || !assetId || !amount) {
      return { error: "Missing required fields", status: 400 };
    }

    const fileName = file.name || `deposit_${Date.now()}.jpg`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const blob = await put(`deposits/${fileName}`, fileBuffer, { access: "public" });

    await connectToDB();

    const deposit = new Deposit({
      userId, 
      assetId,  // Directly save the assetId instead of asset.toString()
      amount,
      proofOfDeposit: blob.url,
      status: "pending",
    });

    await deposit.save();

    return { message: "Deposit recorded successfully!", status: 201 };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload deposit proof", status: 500 };
  }
}

