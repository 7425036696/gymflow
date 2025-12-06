import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true },

  title: { type: String, required: true },
  amount: { type: Number, required: true },

  date: { type: Date, required: true },

  notes: String,

}, { timestamps: true });

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);
