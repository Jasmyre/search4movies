import React from "react";
import styles from "./Movie.module.css";
import PropTypes from 'prop-types'

const Movie = (props) => {
	return (
		<li className={styles.movie}>
			<a href={`/detail/${props.id}`}>
				<img
					src={"https://image.tmdb.org/t/p/w500/" + props.poster_path}
					alt={props.title}
					width={325}
					height={413}
				/>
				<div className={styles.absolute_info}>
					<p className={styles.movie_title}>{props.title}</p>
					<p>{props.release_date}</p>
				</div>
			</a>
		</li>
	);
};

Movie.PropTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	poster_path: PropTypes.string,
	release_date: PropTypes.string
}

export default Movie;
