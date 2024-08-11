"use client";

import React from "react";
import styles from "./TopRated.module.css";
import useSWR from "swr";

import TopRatedMovies from "../top-rated-movies/TopRatedMovies";
import Loading from "../loading/Loading";

const TopRatedSection = () => {
    
    const fetcher = async (url) => {
        noStore();
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
			},
			cache: 'force-cache'
		};

		const res3 = await fetch(
			"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2&region=ph",
			options
		);

		if (!res3.ok) {
			throw new Error("Network response was not ok");
		}

		const data3 = await res3.json();

		const res4 = await fetch(
			"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2&region=ph",
			options
		);

		if (!res4.ok) {
			throw new Error("Network response was not ok");
		}

		const data4 = await res4.json();

		console.log({ data3, data4 });

		return { data3, data4 };
	};

	const { data, error } = useSWR("Popular", fetcher);

	if (error) return error;
	if (!data)
		return (
			<div
				className={styles.popular_section_container}
				id="trending"
			>
				<div className={styles.popular_section_wrapper}>
					<div className={styles.header_wrapper}>
						<h1>Popular</h1>
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
			id="top%20rated"
		>
			<div className={styles.popular_section_wrapper}>
				<div className={styles.header_wrapper}>
					<h1>Top Rated</h1>
				</div>
				<hr />
				<div className={styles.content_wrapper}>
					<TopRatedMovies data={data} />
				</div>
			</div>
		</div>
	);
};

export default TopRatedSection;

export const revalidate = 3;