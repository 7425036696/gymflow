import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  ownerId: { type: String, required: true }, // Clerk userId
  gymName: { type: String, required: true },
  phone: String,
  address: String,

  logoUrl: String,
  coverUrl: String,

  currency: { type: String, default: "INR" },
}, { timestamps: true });

export default mongoose.models.Tenant ||
  mongoose.model("Tenant", TenantSchema);
