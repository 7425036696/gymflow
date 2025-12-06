import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET() {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const start = new Date();
  start.setHours(0,0,0,0);

  const logs = await Attendance.find({
    tenantId: userId,
    checkInAt: { $gte: start }
  }).populate("memberId");

  return Response.json(logs);
}

export async function POST(req) {
  await connectDB();
  const { userId } = auth();
  
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { memberId } = await req.json();

    const newCheckIn = await Attendance.create({
      tenantId: userId,
      memberId,
      checkInAt: new Date(),
    });

    return Response.json(newCheckIn, { status: 201 });
  } catch (error) {
    console.error("Check-in error:", error);
    return new Response("Failed to check in", { status: 500 });
  }
}
