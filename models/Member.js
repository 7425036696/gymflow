import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },

  name: { type: String, required: true },
  phone: { type: String, required: true },

  profileImageUrl: String,

  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  startDate: Date,
  endDate: Date,

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  },

}, { timestamps: true });

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
