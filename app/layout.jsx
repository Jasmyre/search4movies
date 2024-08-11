import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Roboto } from "next/font/google";
import "./globals.css";
import "./css/all.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
	title: "Search4Movies",
	description: "Search for movies",
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
