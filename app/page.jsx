import styles from "./page.module.css";
import Header from "@/components/header/Header";
import HeroSection from "@/components/hero-section/HeroSection";
import FooterSection from "@/components/footer-section/FooterSection";
import PopularSection from "@/components/popular-section/PopularSection";

const Home = () => {
	return (
		<main className={styles.main}>
			<Header navigations={["home", "popular", "categories"]} />
			<HeroSection />
			<PopularSection />
			<FooterSection />
		</main>
	);
};

export default Home;
