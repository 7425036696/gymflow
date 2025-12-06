import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Expense from "@/models/Expense";

export async function PUT(req, { params }) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const updated = await Expense.findOneAndUpdate(
      { _id: params.id, tenantId: userId },
      { ...body },
      { new: true }
    );

    if (!updated) return new Response("Expense not found", { status: 404 });

    return Response.json(updated);

  } catch (error) {
    console.error("Expense update error:", error);
    return new Response("Failed to update expense", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const deleted = await Expense.findOneAndDelete({
      _id: params.id,
      tenantId: userId
    });

    if (!deleted) return new Response("Expense not found", { status: 404 });

    return Response.json({ message: "Expense deleted" });

  } catch (error) {
    console.error("Delete expense error:", error);
    return new Response("Failed to delete expense", { status: 500 });
  }
}
