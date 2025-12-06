import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Expense from "@/models/Expense";

export async function GET() {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const expenses = await Expense.find({ tenantId: userId })
    .sort({ date: -1 });

  return Response.json(expenses);
}

export async function POST(req) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const newExpense = await Expense.create({
      tenantId: userId,
      title: body.title,
      amount: body.amount,
      date: body.date,
      notes: body.notes || "",
    });

    return Response.json(newExpense, { status: 201 });

  } catch (error) {
    console.error("Expense error:", error);
    return new Response("Failed to add expense", { status: 500 });
  }
}
