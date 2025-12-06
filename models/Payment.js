import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },

  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },

  amount: { type: Number, required: true },
  mode: { type: String, enum: ["cash", "upi", "card"], required: true },

  dateOfPayment: { type: Date, default: Date.now },

}, { timestamps: true });

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
