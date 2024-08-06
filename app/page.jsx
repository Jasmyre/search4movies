import styles from "./page.module.css";
import Header from "@/components/header/Header";
import HeroSection from "@/components/hero-section/HeroSection";

const Home = () => {
	return (
		<main className={styles.main}>
			<Header navigations={["home", "popular", "categories"]}></Header>
			<HeroSection />
		</main>
	);
};

export default Home;
