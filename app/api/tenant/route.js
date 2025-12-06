import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Tenant from "@/models/Tenant";

export async function GET() {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const tenant = await Tenant.findOne({ ownerId: userId });
  return Response.json(tenant || {});
}

export async function POST(req) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const tenant = await Tenant.create({
    ownerId: userId,
    gymName: body.gymName,
    phone: body.phone,
    address: body.address,
    logoUrl: body.logoUrl || "",
    coverUrl: body.coverUrl || "",
  });

  return Response.json(tenant, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { userId } = auth();

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const updated = await Tenant.findOneAndUpdate(
    { ownerId: userId },
    { ...body },
    { new: true }
  );

  return Response.json(updated);
}
