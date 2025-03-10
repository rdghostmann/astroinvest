import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  bankAddress: {
    type: String,
    required: true,
  },
  routingNumber: {
    type: Number,
    required: true,
  },
  swiftCode: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Bank || mongoose.model("Bank", BankSchema);