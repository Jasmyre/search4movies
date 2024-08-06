import React from "react";
import Header from "@/components/header/Header";
import DetailsSection from "@/components/details-section/DetailsSection";
import FooterSection from "@/components/footer-section/FooterSection";

const page = ({ params }) => {
	return (
		<main>
			<Header navigations={["home", "popular", "categories"]}></Header>
            <DetailsSection id={params.id}></DetailsSection>
			<FooterSection></FooterSection>
		</main>
	);
};

export default page;
