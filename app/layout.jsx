import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Roboto } from "next/font/google";
import "./globals.css";
import "./css/all.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
	metadataBase: new URL("https://search4movies.vercel.app"),
	keywords: [
		"search4movies",
		"search for movies",
		"search 4 movies",
		"jasmyre search4movies",
	],
	title: {
		default: "Search4Movies",
		template: "%s | Search4Movies",
	},
	openGraph: {
		images: [
			{
				url: "https://github.com/Jasmyre/search4movies/blob/master/public/poster.png",
				width: 1200,
				height: 630,
				alt: "Thumbnail image for https://search4movies.vercel.app",
			},
		],
		description:
			"Your Ultimate Movie Discovery Tool. Search for movies, explore genres, read reviews, and discover new favorites with just a few clicks. the go-to platform for all your movie searching needs.",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
