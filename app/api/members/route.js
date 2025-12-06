import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";
import Plan from "@/models/Plan";

export async function GET() {
  await connectDB();
  
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const members = await Member.find({ tenantId: userId })
    .populate("planId")
    .sort({ createdAt: -1 });

  return Response.json(members);
}

export async function POST(req) {
  await connectDB();
  
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const newMember = await Member.create({
      tenantId: userId,
      name: body.name,
      phone: body.phone,
      planId: body.planId,
      startDate: body.startDate,
      endDate: body.endDate,
      profileImageUrl: body.profileImageUrl || "",
      status: "active"
    });

    return Response.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Create member error:", error);
    return new Response("Failed to create member", { status: 500 });
  }
}
