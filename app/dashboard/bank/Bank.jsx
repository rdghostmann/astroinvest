"use client";
import React, { useState, useEffect } from "react";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addBankAccount, fetchBanksByUser } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import BankList from "./BankList"; // Import the BankList component

export default function Bank({ userID }) {
  const [showPopup, setShowPopup] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [banks, setBanks] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetchBanksByUser(userID);
        setBanks(response);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName || !accountNumber || !accountName || !bankAddress || !routingNumber || !swiftCode) {
      toast({ title: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const bankDetails = {
      userID, // Include the userID
      bankName,
      accountNumber,
      accountName,
      bankAddress,
      routingNumber,
      swiftCode,
    };

    const response = await addBankAccount(bankDetails);

    if (response.ok) {
      toast({ title: "Added Bank successfully!" });
      setShowPopup(false);
      // Optionally, clear the form fields here
      setBankName("");
      setAccountNumber("");
      setAccountName("");
      setBankAddress("");
      setRoutingNumber("");
      setSwiftCode("");
      window.location.reload(); // Refresh the page after successful submission
    } else {
      toast({ title: "Failed to add bank account.", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-full space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Bank Details</h1>
          <Button variant="outline" size="sm" onClick={() => setShowPopup(true)}>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add A New Bank
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Bank List */}
          <BankList banks={banks} />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              <XIcon className="h-6 w-6" />
            </button>
            {/* Bank Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="Enter Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      placeholder="Enter Account Name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAddress">Bank Address</Label>
                    <Input
                      id="bankAddress"
                      placeholder="Enter Bank Address"
                      value={bankAddress}
                      onChange={(e) => setBankAddress(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input
                      id="routingNumber"
                      placeholder="Enter Routing Number"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swiftCode">Swift Code</Label>
                    <Input
                      id="swiftCode"
                      placeholder="Enter Swift Code"
                      value={swiftCode}
                      onChange={(e) => setSwiftCode(e.target.value)}
                    />
                  </div>
                  <CardFooter className="mt-5">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Bank"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}