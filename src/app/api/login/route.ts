import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Fel e-post eller lösenord" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    user: { email: user.email, role: user.role },
  });
  res.cookies.set("role", user.role, { httpOnly: true });
  return res;
}
