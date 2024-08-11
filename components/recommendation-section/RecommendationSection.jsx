"use client";

import React from "react";
import styles from "./RecommendationSection.module.css";
import useSWR from "swr";

import SimilarMovies from "../similar-movies/SimilarMovies";
import RecommendationMovies from "../recommendation-movies/RecommendationMovies";
import Loading from "../loading/Loading";

const RecommendationSection = (props) => {
	console.log(props.data.results)
	return (
		<>
			<div
				className={styles.popular_section_container}
				id="recommendation"
			>
				<div className={styles.popular_section_wrapper}>
					<div className={styles.header_wrapper}>
						<h1>Recommended Movies</h1>
					</div>
					<hr />
					<div className={styles.content_wrapper}>
						{
							(props.data.results) ? <RecommendationMovies data={props.data.results} /> : <p>no results</p>
						}
						
					</div>
				</div>
			</div>
			<div
				className={styles.popular_section_container}
				id="similar"
			>
				<div className={styles.popular_section_wrapper}>
					<div className={styles.header_wrapper}>
						<h1>Similar Movies</h1>
					</div>
					<hr />
					<div className={styles.content_wrapper}>
						
						<SimilarMovies data={props.data.results} />
					</div>
				</div>
			</div>
		</>
	);
};

export default RecommendationSection;
