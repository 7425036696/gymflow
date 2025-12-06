import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET(req, { params }) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const plan = await Plan.findOne({
    _id: params.id,
    tenantId: userId
  });

  if (!plan) return new Response("Plan not found", { status: 404 });

  return Response.json(plan);
}

export async function PUT(req, { params }) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const updatedPlan = await Plan.findOneAndUpdate(
      { _id: params.id, tenantId: userId },
      { ...body },
      { new: true }
    );

    if (!updatedPlan)
      return new Response("Plan not found", { status: 404 });

    return Response.json(updatedPlan);

  } catch (error) {
    console.error("Update plan error:", error);
    return new Response("Failed to update plan", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const deleted = await Plan.findOneAndDelete({
      _id: params.id,
      tenantId: userId
    });

    if (!deleted)
      return new Response("Plan not found", { status: 404 });

    return Response.json({ message: "Plan deleted" });

  } catch (error) {
    console.error("Delete plan error:", error);
    return new Response("Failed to delete plan", { status: 500 });
  }
}
