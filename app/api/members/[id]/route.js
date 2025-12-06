import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Member from "@/models/Member";

export async function GET(req, { params }) {
  await connectDB();
  
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const member = await Member.findOne({
    _id: params.id,
    tenantId: userId
  }).populate("planId");

  if (!member) return new Response("Member not found", { status: 404 });

  return Response.json(member);
}

export async function PUT(req, { params }) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const body = await req.json();

    const updatedMember = await Member.findOneAndUpdate(
      { _id: params.id, tenantId: userId },
      { ...body },
      { new: true }
    );

    if (!updatedMember)
      return new Response("Member not found", { status: 404 });

    return Response.json(updatedMember);
  } catch (error) {
    console.error("Update member error:", error);
    return new Response("Failed to update member", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const deleted = await Member.findOneAndDelete({
      _id: params.id,
      tenantId: userId
    });

    if (!deleted)
      return new Response("Member not found", { status: 404 });

    return Response.json({ message: "Member deleted" });
  } catch (error) {
    console.error("Delete member error:", error);
    return new Response("Failed to delete member", { status: 500 });
  }
}
