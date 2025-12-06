import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET() {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const plans = await Plan.find({ tenantId: userId }).sort({ createdAt: -1 });

  return Response.json(plans);
}

export async function POST(req) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const newPlan = await Plan.create({
      tenantId: userId,
      name: body.name,
      price: body.price,
      durationInDays: body.durationInDays
    });

    return Response.json(newPlan, { status: 201 });

  } catch (error) {
    console.error("Create plan error:", error);
    return new Response("Failed to create plan", { status: 500 });
  }
}
