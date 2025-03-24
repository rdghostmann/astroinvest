import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateKycStatus } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const KycCard = ({ user, kyc }) => {
  const { toast } = useToast();

  const handleKycUpdate = async (kycId, status) => {
    await updateKycStatus(kycId, status);
    toast({ title: `KYC status updated to ${status}` });

    window.location.reload(); // Refresh the page to show updates
  };

  const handleImageError = (e) => {
    console.error("Error loading image:", e.target.src);
    e.target.src = '/path/to/placeholder-image.jpg';
  };

  return (
    <Card key={user._id} className="p-4 shadow-md border rounded-lg">
      <CardHeader>
        <CardTitle className="text-md font-semibold">{user.username}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>KYC Status:</strong> {kyc ? kyc.status : "Not Submitted"}</p>

        {kyc && (
          <>
            <div className="flex gap-2 mt-3">
              {kyc.kyc_front_image && (
                <img
                  src={kyc.kyc_front_image}
                  alt="KYC Front Document"
                  className="w-32 h-32 object-cover rounded-md"
                  onError={handleImageError}
                />
              )}
              {kyc.kyc_back_image && (
                <img
                  src={kyc.kyc_back_image}
                  alt="KYC Back Document"
                  className="w-32 h-32 object-cover rounded-md"
                  onError={handleImageError}
                />
              )}
              {kyc.kyc_selfie_image && (
                <img
                  src={kyc.kyc_selfie_image}
                  alt="KYC Selfie"
                  className="w-32 h-32 object-cover rounded-md"
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                variant="success"
                onClick={() => handleKycUpdate(kyc._id, "Verified")}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleKycUpdate(kyc._id, "Rejected")}
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default KycCard;