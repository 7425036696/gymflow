import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function POST(req) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { attendanceId } = await req.json();

    const updated = await Attendance.findOneAndUpdate(
      { _id: attendanceId, tenantId: userId },
      { checkOutAt: new Date() },
      { new: true }
    );

    if (!updated) return new Response("Attendance not found", { status: 404 });

    return Response.json(updated);
  } catch (error) {
    console.error("Check-out error:", error);
    return new Response("Failed to check out", { status: 500 });
  }
}
