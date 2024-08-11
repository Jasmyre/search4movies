import React from "react";
import Header from "@/components/header/Header";
import SearchResult from "@/components/search-result/SearchResult";
import FooterSection from "@/components/footer-section/FooterSection";

const page = ({ params }) => {
	return (
		<main>
			<Header navigations={["home", "popular", "top rated"]}></Header>
			<SearchResult title={params.title}></SearchResult>
			<FooterSection></FooterSection>
		</main>
	);
};

export default page;
