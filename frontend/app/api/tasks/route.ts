import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://localhost:3001";

// GET — fetch all tasks
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");

  const response = await fetch(`${API_URL}/api/task`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",  
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

// POST — create task
export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization");
  const body = await req.json();

  const response = await fetch(`${API_URL}/api/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "", 
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}