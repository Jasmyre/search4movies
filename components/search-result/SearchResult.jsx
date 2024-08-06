"use client";

import React, { useEffect, useState } from "react";
import styles from "./SearchResult.module.css";
import { searchMovies } from "../tmdbApi/tmdbApi";
import Movie from "../Movie/Movie";

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
				<ul className={styles.movies}>
					{movies.map((movie) =>
						movie.poster_path ? (
							<Movie id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date}></Movie>
						) : (
							<div
								className={styles.no_poster}
								key={movie.id}
							>
								no poster
							</div>
						)
					)}
				</ul>
			</fieldset>
		</div>
	);
};
export default SearchResult;
