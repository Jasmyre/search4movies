import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
    noStore();
    const data = await sql`SELECT * FROM comments;`;
	return NextResponse.json({ data }, { status: 200 });
}