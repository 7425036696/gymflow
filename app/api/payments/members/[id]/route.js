import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function GET(req, { params }) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const payments = await Payment.find({
    tenantId: userId,
    memberId: params.id
  }).sort({ dateOfPayment: -1 });

  return Response.json(payments);
}
