import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";

export async function POST(req) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { memberId, planId, startDate, endDate } = await req.json();

    const updated = await Member.findOneAndUpdate(
      { _id: memberId, tenantId: userId },
      {
        planId,
        startDate,
        endDate,
        status: "active"
      },
      { new: true }
    );

    if (!updated)
      return new Response("Member not found", { status: 404 });

    return Response.json(updated);
  } catch (error) {
    console.error("Renew member error:", error);
    return new Response("Failed to renew membership", { status: 500 });
  }
}
