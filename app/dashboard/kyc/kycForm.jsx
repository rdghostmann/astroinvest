"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const identificationTypes = ["International Passport", "Driver's License", "Selfie"];

export default function KYCForm({ userId }) {
  const [idType, setIdType] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState("Pending");

  useEffect(() => {
    async function fetchKYCStatus() {
      if (!userId) return;
      try {
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (data.kyc?.status) {
          setKycStatus(data.kyc.status);
        }
      } catch (error) {
        console.error("Failed to fetch KYC status:", error);
      }
    }
    fetchKYCStatus();
  }, [userId]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idType || (!selfieFile && (!frontFile || !backFile))) {
      alert("Please fill in all fields and select files.");
      return;
    }
  
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("idType", idType);
      formData.append("userId", userId);

      if (idType === "Selfie") {
        formData.append("selfieFile", selfieFile);
      } else {
        formData.append("frontFile", frontFile);
        formData.append("backFile", backFile);
      }

      const response = await fetch("/api/kycupload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files.");
      }

      const result = await response.json();
      console.log("Uploaded Files:", result);

      setKycStatus("Submitted");
      alert("Files uploaded successfully! Your KYC is now pending approval.");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload files.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/3 space-y-6 my-2 basis-0">
      <h3 className="px-4 text-lg font-semibold">Upload Valid Identification</h3>
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-600">KYC Status:</p>
        <p className={`text-lg font-semibold mt-1 ${kycStatus === "Verified" ? "text-green-600" : kycStatus === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
          {kycStatus}
        </p>
      </div>
      <div className="mb-2 bg-white shadow-md p-4 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <Label className="text-sm text-gray-500">Identification Type:</Label>
            <Select onValueChange={setIdType} className="bg-transparent p-2 rounded w-full">
              <SelectTrigger className="bg-transparent p-2 rounded w-full">
                <SelectValue placeholder="-- Select Identification Type --" />
              </SelectTrigger>
              <SelectContent>
                {identificationTypes.map((type, index) => (
                  <SelectItem key={index} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Inputs - Change based on Selection */}
          {idType === "Selfie" ? (
            <div className="w-full">
              <Label className="text-sm text-gray-500">Upload or Take a Selfie:</Label>
              <Input type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, setSelfieFile)} className="bg-transparent p-2 rounded w-full" />
            </div>
          ) : (
            <>
              <div className="w-full">
                <Label className="text-sm text-gray-500">Identity Front:</Label>
                <Input type="file" onChange={(e) => handleFileChange(e, setFrontFile)} className="bg-transparent p-2 rounded w-full" />
              </div>
              <div className="w-full">
                <Label className="text-sm text-gray-500">Identity Back:</Label>
                <Input type="file" onChange={(e) => handleFileChange(e, setBackFile)} className="bg-transparent p-2 rounded w-full" />
              </div>
            </>
          )}

          <Button type="submit" className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
}
