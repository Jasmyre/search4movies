"use client"

import React from "react";
import styles from "./PopularSection.module.css";
import useSWR from "swr";

import PopularMovies from '../popular-movies/PopularMovies'
import Loading from "../loading/Loading";

const PopularSection = () => {
	const fetcher = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
			},
		};

		const res = await fetch(
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
			options
		);

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await res.json();
		console.log(data)

		return data;
	};

	const {data, error} = useSWR("Popular", fetcher);

	if (error) return "An Error Has Occured";
	if (!data) return (
		<div
			className={styles.popular_section_container}
			id="popular"
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
			id="popular"
		>
			<div className={styles.popular_section_wrapper}>
				<div className={styles.header_wrapper}>
					<h1>Popular</h1>
				</div>
				<hr />
				<div className={styles.content_wrapper}>
					<PopularMovies data={data.results} />
				</div>
			</div>
		</div>
	);
};

export default PopularSection;
