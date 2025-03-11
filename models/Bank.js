import mongoose from "mongoose";

const BankSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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

const Bank = mongoose.models?.Bank || mongoose.model("Bank", BankSchema);
export default Bank;