import styles from "./page.module.css";
import Header from "@/components/header/Header";

const Home = () => {
	return (
		<main className={styles.main}>
			<Header navigations={["home", "popular", "categories"]}></Header>
		</main>
	);
};

export default Home;
