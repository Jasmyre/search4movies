import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
	return (
		<section className={styles.hero_section}>
			<div className={styles.hero_wrapper}>
				<h1 className="averia-serif-libre-bold">
					Your Ultimate Movie Discovery Tool
				</h1>
				<p className="cinzel">
					Explore genres, read reviews, and discover new favorites
					with just a few clicks. the go-to platform for all your
					movie searching needs.
				</p>
			</div>
		</section>
	);
};

export default HeroSection;
