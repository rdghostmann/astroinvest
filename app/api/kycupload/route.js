import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectDB"; 
import Kyc from "@/models/Kyc";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth"; // Ensure you have this authOptions defined

export async function POST(req) {
  try {
    console.log("Connecting to DB...");
    await connectToDB(); 
    console.log("Database connected!");

    // Fetch session user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    
    const userId = session.user.id;
    console.log("Session user ID:", userId);

    // Check if a KYC record already exists for this user
    const existingKyc = await Kyc.findOne({ user_id: userId });
    if (existingKyc) {
      return new NextResponse(
        JSON.stringify({
          message: "You have already submitted KYC and it is under review.",
          kycStatus: existingKyc.status,
          frontImageUrl: existingKyc.kyc_front_image,
          backImageUrl: existingKyc.kyc_back_image,
          selfieImageUrl: existingKyc.kyc_selfie_image, // or kyc_selfie_image based on your schema
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get form data
    const formData = await req.formData();
    const idType = formData.get("idType");
    if (!idType) {
      return NextResponse.json({ error: "Identification type is required" }, { status: 400 });
    }

    let frontBlobUrl = "";
    let backBlobUrl = "";
    let selfieBlobUrl = "";

    if (idType === "Selfie") {
      // Handle selfie upload
      const selfieFile = formData.get("selfieFile");
      if (!selfieFile) {
        return NextResponse.json({ error: "Selfie file is required" }, { status: 400 });
      }
      const selfieBlob = await put(selfieFile.name, selfieFile, { access: "public" });
      selfieBlobUrl = selfieBlob.url;
      console.log("Selfie uploaded:", selfieBlobUrl);
    } else {
      // Handle front and back image upload
      const frontFile = formData.get("frontFile");
      const backFile = formData.get("backFile");
      if (!frontFile || !backFile) {
        return NextResponse.json({ error: "Both front and back images are required" }, { status: 400 });
      }
      const frontBlob = await put(frontFile.name, frontFile, { access: "public" });
      const backBlob = await put(backFile.name, backFile, { access: "public" });

      frontBlobUrl = frontBlob.url;
      backBlobUrl = backBlob.url;
      console.log("Front and Back images uploaded:", frontBlobUrl, backBlobUrl);
    }

    // Save new KYC record to MongoDB
    const newKyc = new Kyc({
      user_id: userId,
      id_type: idType,
      kyc_front_image: frontBlobUrl,
      kyc_back_image: backBlobUrl,
      kyc_selfie_image: selfieBlobUrl,
      status: "pending",
    });

    await newKyc.save();
    console.log("KYC record saved:", newKyc);

    return new NextResponse(
      JSON.stringify({
        message: "KYC uploaded successfully!",
        frontImageUrl: frontBlobUrl,
        backImageUrl: backBlobUrl,
        selfieImageUrl: selfieBlobUrl,
        kycStatus: newKyc.status,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Upload Error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Failed to upload files" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req) {
  try {
    console.log("Connecting to DB...");
    await connectToDB();
    console.log("Database connected!");

    // Fetch session user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const userId = session.user.id;
    console.log("Fetching KYC for user ID:", userId);

    // Retrieve KYC details
    const kycData = await Kyc.findOne({ user_id: userId });
    if (!kycData) {
      return NextResponse.json({ kycStatus: "Not Submitted" }, { status: 200 });
    }

    console.log("KYC Data Fetched:", kycData);
    return NextResponse.json({
      idType: kycData.id_type,
      frontImageUrl: kycData.kyc_front_image,
      backImageUrl: kycData.kyc_back_image,
      selfieImageUrl: kycData.kyc_selfie_image,
      kycStatus: kycData.status,
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch KYC data" }, { status: 500 });
  }
}
