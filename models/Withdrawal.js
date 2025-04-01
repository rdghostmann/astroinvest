import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    withdrawWallet: {
      type: String,
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"], // Possible statuses
      default: "pending", // Default status
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Fix the model export
const Withdrawal =  mongoose.models?.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);
export default Withdrawal;