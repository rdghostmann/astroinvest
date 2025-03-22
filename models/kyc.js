import mongoose from "mongoose";

const KycSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_type: {
      type: String,
      required: true
    },
    kyc_front_image: {
      type: String,
      required: function () {
        return this.id_type !== "Selfie";
      }
    },
    kyc_back_image: {
      type: String,
      required: function () {
        return this.id_type !== "Selfie";
      }
    },
    kyc_selfie_image: {
      type: String,
      required: function () {
        return this.id_type === "Selfie";
      }
    },
    status: {
      type: String,
      enum: ["pending", "Verified", "Rejected"],
      default: "pending", // Changed from "Not verified" to "pending" to match enum
    },
  },
  { timestamps: true }
);

const Kyc = mongoose.models?.Kyc || mongoose.model("Kyc", KycSchema);
export default Kyc;
