import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
	const dateClass = new Date();
	const monthName = dateClass.toLocaleString("default", { month: "long" });


	const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const comment = searchParams.get("comment");
	const date = `${monthName} ${dateClass.getDate()}, ${dateClass.getFullYear()}`
    

	try {
		if (!name || !comment)
			throw new Error("name and comment required");
		await sql`
			INSERT INTO comments (name, date, comment)
			VALUES (${name}, ${date}, ${comment});
		`;
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	const data = await sql`SELECT * FROM comments;`;
	return NextResponse.json({ data }, { status: 200 });
}

// INSERT INTO comments (name, comment, commentid)
// VALUES ('Guest', 'Nice website, clean ui, free, easy to use.', (SELECT COUNT(*) AS RowCount
// FROM comments))

// INSERT INTO comments (
//     name,
//     comment
// ) VALUES (
//     'Guest',
//     'awesome website, totally free!'   
// );