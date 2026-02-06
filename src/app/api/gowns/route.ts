import { NextResponse } from "next/server";
import { getGownsFromSheet } from "@/lib/sheets";

// Cache for 5 minutes in production, 1 minute in dev
export const revalidate = process.env.NODE_ENV === 'production' ? 300 : 60;

export async function GET() {
  try {
    const gowns = await getGownsFromSheet();
    
    return NextResponse.json(gowns, {
      headers: {
        // Cache on CDN for 5 minutes, serve stale for 10 minutes while revalidating
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error("Error fetching gowns:", error);
    return NextResponse.json(
      { error: "Failed to fetch gowns" },
      { status: 500 }
    );
  }
}
