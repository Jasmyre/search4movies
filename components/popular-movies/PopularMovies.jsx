import React from "react";
import styles from "./PopularMovies.module.css";
import Movie from "../movie/Movie";
const PopularMovies = (props) => {
	return (
		<ul className={styles.movies}>
			{props.data.map((movie) =>
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
		</ul>
	);
};

export default PopularMovies;
