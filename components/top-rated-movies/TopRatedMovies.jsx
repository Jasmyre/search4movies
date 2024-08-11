import React from "react";
import styles from "./TopRatedMovies.module.css";
import Movie from "../movie/Movie";

const TopRatedMovies = (props) => {
    console.log(props)

	return (
		<ul className={styles.movies}>
			<div className={styles.div1}>
				{props.data.data3.results.map((movie) =>
					movie.poster_path ? (
						<Movie
							key={movie.id}
							id={movie.id}
							poster_path={movie.poster_path}
							title={movie.title}
							release_date={movie.release_date}
						></Movie>
					) : (
						<div
							className={styles.no_poster}
							key={movie.id}
						>
							no poster
						</div>
					)
				)}
			</div>
			<div className={styles.div2}>
				{props.data.data4.results.map((movie) =>
					movie.poster_path ? (
						<Movie
							key={movie.id}
							id={movie.id}
							poster_path={movie.poster_path}
							title={movie.title}
							release_date={movie.release_date}
						></Movie>
					) : (
						<div
							className={styles.no_poster}
							key={movie.id}
						>
							no poster
						</div>
					)
				)}
			</div>
		</ul>
	);
};

export default TopRatedMovies;
