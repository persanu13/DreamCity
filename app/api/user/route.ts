'use server'


import { auth } from "@/auth"; // Adjust path if needed
import { NextResponse } from "next/server";
import { getUserId } from "@/app/db/actions/users";

export async function GET() {
  try {
    // Get user session
    const session = await auth();

    // If no session, return unauthorized
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = session.user;

    // Validate session data
    if (!name || !email) {
      return NextResponse.json({ error: "Invalid session data" }, { status: 400 });
    }

    // Fetch user ID
    const userId = await getUserId(name, email);

    // If user not found, return error
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user ID
    return NextResponse.json({ id: userId });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
