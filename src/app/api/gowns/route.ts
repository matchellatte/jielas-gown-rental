import { NextResponse } from "next/server";
import { getGownsFromSheet } from "@/lib/sheets";

export async function GET() {
  try {
    const gowns = await getGownsFromSheet();
    return NextResponse.json(gowns);
  } catch (error) {
    console.error("Error fetching gowns:", error);
    return NextResponse.json(
      { error: "Failed to fetch gowns" },
      { status: 500 }
    );
  }
}
