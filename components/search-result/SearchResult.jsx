"use client";

import React from "react";
import styles from "./SearchResult.module.css";
import useSWR from "swr";
import Movies from "../movies/Movies";
import Loading from "../loading/Loading";



const SearchResult = (props) => {
	const fetcher = async (url) => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
			},
		};

		const res = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${props.title}&include_adult=true&language=en-US&page=1&region=Philippines`,
			options
		);

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await res.json();
		console.log(data);
		

		return data;
	};
	

	const { data, error } = useSWR("Popular",fetcher);

	if (error) return "An Error Has Occured";
	if (!data) return (
		<div className={styles.search_result_container}>
			<fieldset className={styles.search_result_wrapper}>
				<legend>Search Result</legend>
				<Loading />
			</fieldset>
		</div>
	);

	return (
		<div className={styles.search_result_container}>
			<fieldset className={styles.search_result_wrapper}>
				<legend>Search Result</legend>
				<Movies data={data.results} />
			</fieldset>
		</div>
	);
};
export default SearchResult;
