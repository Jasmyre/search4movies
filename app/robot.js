export default function robots() {
	// Base Uniform Resource Locator
	const baseUrl = "https://search4movies.vercel.app";

	return {
		rules: {
			userAgent: "*",
			allow: ["/"],
			disallow: "",
		},
		sitemap: `${baseUrl}sitemap.xml`,
	};
}
