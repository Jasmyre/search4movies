export default async function sitemap() {
    // Base Uniform Resource Locator
    const baseUrl = "https://search4movies.vercel.app";

    return [{
        url: baseUrl,
        lastModified: new Date(),
    }]
    
}