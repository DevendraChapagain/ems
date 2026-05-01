import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");
    const response = await fetch(`${BACKEND_URL}/api/user`, {
      headers: { Authorization: token || "" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();
    const response = await fetch(`${BACKEND_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}