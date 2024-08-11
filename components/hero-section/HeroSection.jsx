import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
	return (
		<section className={styles.hero_section}>
			<div className={styles.hero_wrapper}>
				<h1 className="averia-serif-libre-bold">Discover Movies Now</h1>
				<p className="cinzel">
					simplify your movie search experience. Just type in a movie
					title, and we'll provide you with everything you need to
					know—release date, language, overview, and ratings. We also
					show you where you can watch it in your country, making it
					easy to find the best streaming options. No categories, no
					hassle, just straightforward and quick access to the movies
					you love.
				</p>
			</div>
		</section>
	);
};

export default HeroSection;
