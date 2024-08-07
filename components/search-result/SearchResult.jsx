"use client";

import React, { useEffect, useState } from "react";
import styles from "./SearchResult.module.css";
import { searchMovies } from "../tmdbApi/tmdbApi";
import Movies from "../movies/Movies";

const SearchResult = (props) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await searchMovies(props.title);
				console.log(data);
				setMovies(data.results);
			} catch (error) {
				console.error("Error fetching movie data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className={styles.search_result_container}>
			<fieldset className={styles.search_result_wrapper}>
				<legend>Search Result</legend>
				<Movies data={movies} />
			</fieldset>
		</div>
	);
};
export default SearchResult;
