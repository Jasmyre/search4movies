"use client"

import React from "react";
import styles from "./PopularSection.module.css";
import useSWR from "swr";

import PopularMovies from '../popular-movies/PopularMovies'
import Loading from "../loading/Loading"

const PopularSection = () => {
	
	const fetcher = async (url) => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
			},
			cache: 'force-cache'
		};

		const res1 = await fetch(
			"https://api.themoviedb.org/3/trending/movie/day?language=en-US",
			options
		);

		if (!res1.ok) {
			throw new Error("Network response was not ok");
		}

		const data1 = await res1.json();

		const res2 = await fetch(
			"https://api.themoviedb.org/3/trending/movie/week?language=en-US",
			options
		);

		if (!res2.ok) {
			throw new Error("Network response was not ok");
		}

		const data2 = await res2.json();

		const res3 = await fetch(
			"https://api.themoviedb.org/3/trending/all/week?language=en-US",
			options
		);

		if (!res3.ok) {
			throw new Error("Network response was not ok");
		}

		const data3 = await res3.json();

		const res4 = await fetch(
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
			options
		);

		if (!res4.ok) {
			throw new Error("Network response was not ok");
		}

		const data4 = await res4.json();

		console.log({data1, data2, data3, data4});
		

		return {data1, data2, data3, data4};
	};

	const { data, error } = useSWR("Popular",fetcher);

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
					<PopularMovies data={data} />
				</div>
			</div>
		</div>
	);
};

export default PopularSection;
