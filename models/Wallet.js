import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Fix the model export
const Wallet = mongoose.models?.Wallet || mongoose.model("Wallet", WalletSchema);
export default Wallet;