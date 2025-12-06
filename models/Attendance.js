import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },

  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },

  checkInAt: { type: Date, required: true },
  checkOutAt: { type: Date },

}, { timestamps: true });

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
