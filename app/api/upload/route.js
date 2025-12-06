import { auth } from "@clerk/nextjs/server";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function POST(req) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const { filePath } = await req.json();

    const storageRef = ref(storage, filePath);

    const uploadUrl = await getDownloadURL(storageRef);

    return Response.json({ uploadUrl });

  } catch (error) {
    console.error("Upload error:", error);
    return new Response("Failed to generate upload URL", { status: 500 });
  }
}
