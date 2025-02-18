"use server";

import { connectToDB } from "@/lib/connectDB";
import Asset from "@/models/Assets";

export async function fetchAssets() {
  try {
    await connectToDB();
    // Fetch only the name and depositAddress fields for each asset
    const assets = await Asset.find({}, "name depositAddress").lean();
    return assets;
  } catch (error) {
    console.error("Error fetching assets:", error);
    return []; // Return an empty array on error
  }
}
