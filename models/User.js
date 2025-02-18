// User Model
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid" ],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null
  },
  walletAddress: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  profitTotal: {
    type: Number,
    default: 0
  },
  assets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      default: null
    }
  ],
  plan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      default: null
    }
  ], // References selected investment plan
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      default: null
    }
  ], // References transactions
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }, // For Magic Link verification

},
  {
    timestamps: true,
  });

// Fix the model export
const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
