import { NextResponse } from "next/server";

import { DEFAULT_APP_STATE } from "@/lib/services/demo-data";

export async function GET() {
  return NextResponse.json(DEFAULT_APP_STATE);
}
