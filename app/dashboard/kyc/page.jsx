"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const identificationTypes = ["International Passport", "Driver's License", "Selfie"];

export default function Page() {
  const [idType, setIdType] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState("Loading...");

  const { toast } = useToast();

  // Fetch current KYC status on mount
  useEffect(() => {
    async function fetchKycStatus() {
      try {
        const response = await fetch("/api/kycupload", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch KYC status");
        }
        const data = await response.json();
        setKycStatus(data.kycStatus || "Not Submitted");
      } catch (error) {
        console.error("Error fetching KYC status:", error);
        setKycStatus("Not Submitted");
      }
    }
    fetchKycStatus();
  }, []);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prevent re-upload if KYC is already pending
    if (kycStatus === "pending") {
      toast({ title: "Your KYC is already under review. Please wait for admin approval." });
      return;
    }
  
    if (!idType || (!selfieFile && (!frontFile || !backFile))) {
      alert("Please fill in all fields and select files.");
      return;
    }
  
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("idType", idType);
  
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
  
      setKycStatus(result.kycStatus || "Submitted");
      toast({ title: "Files uploaded successfully! Your KYC is now pending approval." });
  
      // Clear input fields after successful upload
      setFrontFile(null);
      setBackFile(null);
      setSelfieFile(null);
      e.target.reset(); // Reset the form inputs
  
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload files.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>KYC Verification</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="text-sm/5 mb-2 bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-purple-600 font-bold text-xl">KYC Verification</h2>
            <p className="text-slate-700">Complete KYC Verification</p>
          </div>

          <div className="w-full lg:w-1/3 space-y-6 my-2 basis-0">
            <h3 className="px-4 text-lg font-semibold">Upload Valid Identification</h3>

            {/* KYC Status Display */}
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">KYC Status:</p>
              <p className={`text-lg font-semibold mt-1 ${
                kycStatus === "Verified"
                  ? "text-green-600"
                  : kycStatus === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}>
                {kycStatus}
              </p>
            </div>

            <div className="mb-2 bg-white shadow-md p-4 rounded-lg">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Identification Type */}
                <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
                  <div className="w-full">
                    <Label className="text-sm text-gray-500">
                      Identification Type:
                    </Label>
                    <Select onValueChange={setIdType} className="bg-transparent p-2 rounded w-full">
                      <SelectTrigger className="bg-transparent p-2 rounded w-full">
                        <SelectValue placeholder="-- Select Identification Type --" />
                      </SelectTrigger>
                      <SelectContent>
                        {identificationTypes.map((type, index) => (
                          <SelectItem key={index} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dynamic File Inputs */}
                {idType === "Selfie" ? (
                  <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div className="w-full">
                      <Label className="text-sm text-gray-500">Upload or Take a Selfie:</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => handleFileChange(e, setSelfieFile)}
                        className="bg-transparent p-2 rounded w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div className="w-full">
                        <Label className="text-sm text-gray-500">Identity Front:</Label>
                        <Input type="file" onChange={(e) => handleFileChange(e, setFrontFile)} className="bg-transparent p-2 rounded w-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div className="w-full">
                        <Label className="text-sm text-gray-500">Identity Back:</Label>
                        <Input type="file" onChange={(e) => handleFileChange(e, setBackFile)} className="bg-transparent p-2 rounded w-full" />
                      </div>
                    </div>
                  </>
                )}

                {/* Upload Button */}
                <Button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg mt-6"
                  disabled={uploading || kycStatus === "Verified"}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
