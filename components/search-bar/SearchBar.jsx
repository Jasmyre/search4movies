"use client";

import React, { useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
	const inp = useRef(null);
	const btn = useRef(null);

	const handleSearch = () => {
		const query = inp.current.value;
		window.location.href = `/search/${query}`;
	};

	useEffect(() => {
		inp.current.addEventListener("keypress", function (event) {
			if (event.key === "Enter" && inp.current.value) {
				btn.current.click();
			}
		});
	}, []);

	return (
		<div className={styles.search_bar}>
			<div className={styles.search_input_wrapper}>
				<input
					type="text"
					ref={inp}
					placeholder="Search..."
				/>
			</div>
			<button
				className={styles.search_button_wrapper}
				onClick={handleSearch}
				ref={btn}
			>
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>
		</div>
	);
};

export default SearchBar;
