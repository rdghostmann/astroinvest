"use client";

import { useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CopyToClipboardButton from "./CopyToClipboardButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { depositUpload } from "@/lib/depositUpload";
import { useToast } from "@/hooks/use-toast";

export default function DepositForm({ assets }) {
  const { toast } = useToast();
  const router = useRouter();

  // Declare necessary state variables.
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amount, setAmount] = useState("");

  const inputFileRef = useRef(null);

  // When an asset is selected, find it in the assets array and set it.
  const handleAssetChange = (assetName) => {
    const asset = assets.find((a) => a.name === assetName);
    setSelectedAsset(asset);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    // Ensure a file is selected.
    if (!inputFileRef.current.files[0]) {
      toast.error("Please select a file.");
      return;
    }
    // Also ensure an asset and amount are selected.
    if (!selectedAsset) {
      toast.error("Please select an asset.");
      return;
    }
    if (!amount) {
      toast.error("Please enter a deposit amount.");
      return;
    }

    setLoading(true);
    setUploading(true);

    // Prepare formData to be sent.
    const formData = new FormData();
    formData.append("file", inputFileRef.current.files[0]);
    // Use the asset _id if available, otherwise fallback to asset name.
    formData.append("assetId", selectedAsset._id || selectedAsset.name);
    formData.append("amount", amount);

    try {
      const response = await depositUpload(formData);

      if (response.status === 201) {
        toast.success("Deposit submitted successfully!", {
          action: {
            label: "Undo",
            // onClick: () => console.log("Undo"),
          },
        });
        router.push("/dashboard");
      } else {
        toast.error("Upload failed. Try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="mb-2 bg-white shadow-md p-4 rounded-lg">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <Label htmlFor="deposit_Amount" className="text-sm text-gray-500">
            Deposit Amount ($):
          </Label>
          <Input
            id="deposit_Amount"
            name="deposit_Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="bg-transparent p-2 rounded w-full"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <Label htmlFor="Asset_Name" className="text-sm text-gray-500">
            Choose Asset:
          </Label>
          <Select onValueChange={handleAssetChange} value={selectedAsset?.name || ""}>
            <SelectTrigger className="bg-transparent p-2 rounded w-full">
              <SelectValue placeholder="-- Select Asset --" />
            </SelectTrigger>
            <SelectContent>
              {assets.map((asset) => (
                <SelectItem key={asset._id || asset.name} value={asset.name}>
                  {asset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAsset && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-purple-700 text-sm">
              {`Only send ${amount} of ${selectedAsset.name} to ${selectedAsset.depositAddress}.`}
            </p>
            <p className="text-purple-700 text-sm">
              Ensure the sender is on the correct network.
            </p>
            <Label htmlFor="Asset_Address" className="flex justify-between text-sm text-gray-500">
              <span>Wallet Address:</span>
              <CopyToClipboardButton text={selectedAsset.depositAddress} />
            </Label>
            <Input
              id="Asset_Address"
              name="Asset_Address"
              type="text"
              value={selectedAsset.depositAddress}
              disabled
              readOnly
              className="bg-transparent p-2 rounded w-full text-gray-700"
            />
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <Label htmlFor="proof-upload" className="text-sm text-gray-500">
            Proof of Payment:
          </Label>
          <Input
            ref={inputFileRef}
            type="file"
            name="proof-upload"
            id="proof-upload"
            required
            className="block w-full border p-2 rounded-lg"
          />
        </div>

        <Button
          variant="outline"
          type="submit"
          disabled={uploading || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
}
