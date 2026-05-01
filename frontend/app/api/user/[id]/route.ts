// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL || "http://localhost:3001";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("authorization");
    const response = await fetch(`${BACKEND_URL}/api/user/${params.id}`, {
      method: "DELETE",
      headers: { Authorization: token || "" },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}