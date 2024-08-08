import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";

import PropTypes from "prop-types";
import SearchBar from "../search-bar/SearchBar";

import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

let isHamburgerClicked = false;

const Header = (props) => {
	const navigations = props.navigations.map((nav) => {
		return (
			<li key={nav}>
				<a
					href={`/#${nav}`}
					className={styles.a}
				>
					<span>{nav}</span>
				</a>
			</li>
		);
	});

	return (
		<div className={styles.header_container}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<a href="/">
						<Image
							src="/logo.svg"
							alt="Logo"
							width={30}
							height={30}
							priority
						/>
						<p>Search4Movies</p>
					</a>
				</div>
				<div className={styles.nav_wrapper}>
					<nav className={styles.nav}>
						<input
							type="checkbox"
							id="burger"
							name="burger"
						/>
						<label
							className={styles.burger}
							htmlFor="burger"
						>
							<span></span>
							<span></span>
							<span></span>
						</label>
						<ul>{navigations}</ul>
					</nav>
					<div className={styles.search_bar}>
						<SearchBar></SearchBar>
					</div>
				</div>
			</header>
		</div>
	);
};

Header.PropTypes = {
	navigations: PropTypes.array.isRequired,
};

export default Header;
