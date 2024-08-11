"use client";

import React from "react";
import styles from "./RecommendationSection.module.css";

import SimilarMovies from "../similar-movies/SimilarMovies";
import RecommendationMovies from "../recommendation-movies/RecommendationMovies";

const RecommendationSection = (props) => {
	console.log(props.data);
	
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
						{props.data &&
						props.data.recommendationData1.results.length > 0 ? (
							<RecommendationMovies data={props.data} />
						) : (
							<h1>No Recommended Movies.</h1>
						)}
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
						{props.data &&
						props.data.similarData1.results.length > 0 ? (
							<SimilarMovies data={props.data} />
						) : (
							<h1>No Similar Movies.</h1>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default RecommendationSection;
