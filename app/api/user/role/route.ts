import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { MyUser } from "@/app/db/definitions"; // Import your MyUser type

export async function GET() {
  const session = await auth();

  // Type assertion to ensure the user has the correct type
  const user = session?.user as MyUser | undefined; // Type the user to MyUser

  // Extract the role, fallback to null if user or role is not available
  const userRole = user?.role || null;

  // Return the role as a JSON response
  return NextResponse.json({ role: userRole });
}
