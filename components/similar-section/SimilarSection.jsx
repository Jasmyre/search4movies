"use client";

import React from "react";
import styles from "./SimilarSection.module.css";
import useSWR from "swr";

import SimilarMovies from "../recommendation-movies/RecommendationMovies";
import Loading from "../loading/Loading";

const SimilarSection = (props) => {
	const fetcher = async (url) => {
		const res = await fetch(url);

		const data = res.json();
		console.log(data);

		return data;
	};

	const { data, error } = useSWR(
		`/api/recommendation?id=${props.id}&page=1`,
		fetcher
	);

	if (error) return "An Error Has Occured";
	if (!data)
		return (
			<div
				className={styles.popular_section_container}
				id="similar"
			>
				<div className={styles.popular_section_wrapper}>
					<div className={styles.header_wrapper}>
						<h1>Similar Movies</h1>
					</div>
					<hr />
					<div className={styles.loading_wrapper}>
						<Loading />
					</div>
				</div>
			</div>
		);

	return (
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
					<SimilarMovies data={data} />
					<p>{data.results.id}</p>
				</div>
			</div>
		</div>
	);
};

export default SimilarSection;