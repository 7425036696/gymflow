import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },

  name: { type: String, required: true },
  price: { type: Number, required: true },
  durationInDays: { type: Number, required: true }, // 30, 90, 180, 365
}, { timestamps: true });

export default mongoose.models.Plan ||
  mongoose.model("Plan", PlanSchema);
