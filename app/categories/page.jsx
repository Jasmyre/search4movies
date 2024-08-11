import React from "react";
import styles from "./page.module.css";

import Header from "@/components/header/Header";
import FooterSection from "@/components/footer-section/FooterSection";

const page = ({ params }) => {
	return (
		<main>
			<Header navigations={["home", "popular", "categories"]}></Header>
			<main className={styles.main}></main>
			<FooterSection></FooterSection>
		</main>
	);
};

export default page;
