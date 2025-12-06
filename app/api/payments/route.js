import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function GET() {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const payments = await Payment.find({ tenantId: userId })
    .populate("memberId planId")
    .sort({ dateOfPayment: -1 });

  return Response.json(payments);
}

export async function POST(req) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const newPayment = await Payment.create({
      tenantId: userId,
      memberId: body.memberId,
      planId: body.planId,
      amount: body.amount,
      mode: body.mode,
      dateOfPayment: new Date()
    });

    return Response.json(newPayment, { status: 201 });

  } catch (error) {
    console.error("Payment error:", error);
    return new Response("Failed to add payment", { status: 500 });
  }
}
