"use client";
import React, { useState } from "react";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { addCardDetails } from "@/lib/actions"; // Import the server action

export default function CardDetail({ userID }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [bankName, setBankName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !cardType || !bankName) {
      toast({ title: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const cardDetails = {
      userID, // Include the userID
      cardNumber,
      cardType,
      bankName,
    };

    const response = await addCardDetails(cardDetails);

    if (response.ok) {
      toast({ title: "Added Card successfully!" });
      setShowPopup(false);
      // Optionally, clear the form fields here
      setCardNumber("");
      setCardType("");
      setBankName("");
      window.location.href = "/dashboard/card"; // Refresh the page after successful submission
    } else {
      toast({ title: "Failed to add card.", variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-full space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Card Details</h1>
          <Button variant="outline" size="sm" onClick={() => setShowPopup(true)}>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add A New Card
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Bank Card Preview */}
          <Card className="bg-gradient-to-br from-purple-600 to-purple-900 text-white">
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="text-xl font-semibold">{bankName || "Bank Name"}</div>
                <div className="font-mono text-2xl tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs opacity-75">Card Holder</div>
                    <div className="text-sm font-medium">JOHN DOE</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-75">Expires</div>
                    <div className="text-sm font-medium">{expiryDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <button className="absolute top-2 right-2 rounded-full border border-white text-gray-50 hover:text-gray-700"
            onClick={() => setShowPopup(false)} >
            <XIcon color="#fff" className="h-6 w-6" />
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Card Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add Card Details</CardTitle>
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
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardType">Card Type</Label>
                    <Select onValueChange={setCardType} value={cardType}>
                      <SelectTrigger id="cardType">
                        <SelectValue placeholder="Select Card Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Verve">Verve</SelectItem>
                        <SelectItem value="Master">Master</SelectItem>
                        <SelectItem value="Visa">Visa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Card Holder Name</Label>
                    <Input id="name" placeholder="Enter card holder name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        type="month"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={3} />
                    </div>
                  </div>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Card"}
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