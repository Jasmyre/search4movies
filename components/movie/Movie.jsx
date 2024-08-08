
'use client'

import { useInView } from "react-intersection-observer";
import React, {useRef} from "react";
import styles from "./Movie.module.css";
import PropTypes from 'prop-types'

const Movie = (props) => {
	const { ref, inView } = useInView({
		triggerOnce: false, // Trigger animation only once
		threshold: 0.1, // 10% of the element must be visible
	});

	return (
		<li className={`${styles.movie}  ${inView ? styles.visible : ""}`} ref={ref}>
			<a href={`/detail/${props.id}`}>
				<img
					src={"https://image.tmdb.org/t/p/w500/" + props.poster_path}
					alt={props.title}
					className={styles.img}
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
