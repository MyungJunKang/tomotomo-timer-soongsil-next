import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const response = await fetch("http://13.209.210.123:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const { accessToken } = result.data;

  const res = NextResponse.json({ success: true });
  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });

  return res;
}
