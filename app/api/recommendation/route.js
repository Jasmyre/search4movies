import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request) {
	noStore();

	const { searchParams } = new URL(request.url);
	const page = searchParams.get("page");
	const id = searchParams.get("id");

	// Ensure both page and id are provided
	if (!id || !page) {
		return NextResponse.json(
			{ error: "Missing page or id parameter" },
			{ status: 400 }
		);
	}

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			'Cache-Control': 'no-cache',
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
		},
        cache: "no-store",
	};

	try {
		const apiResponse = await fetch(
			`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
			options
		);

		if (!apiResponse.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch data" },
				{ status: apiResponse.status }
			);
		}

		const data = await apiResponse.json();
		return NextResponse.json(data, {
			status: 200,
			headers: {
				"Cache-Control": "no-store", // This prevents caching
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
