import styles from "./page.module.css";
import Header from "@/components/header/Header";
import TopRatedSection from "@/components/top-rated/TopRated";
import HeroSection from "@/components/hero-section/HeroSection";
import FooterSection from "@/components/footer-section/FooterSection";
import PopularSection from "@/components/popular-section/PopularSection";
import CommentSection from "@/components/comment-section/CommentSection";

const Home = () => {
	
	return (
		<main className={styles.main}>
			<Header navigations={["home", "popular", "top rated"]} />
			<HeroSection />
			<PopularSection />
			<TopRatedSection />
			<CommentSection />
			<FooterSection />
		</main>
	);
};

export default Home;

