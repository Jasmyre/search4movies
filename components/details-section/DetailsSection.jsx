"use client"

import React from "react";
import styles from "./DetailsSection.module.css";

import useSWR from "swr";

const DetailsSection = (props) => {
	const fetcher = async () => {
		const options = await {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMjkyODk3My4wNzQxMiwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FtDKh6tJRrHz-13hHF2shi7SfvUU7tG82dK7p7DKoZU",
			},
		};

		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${props.id}?language=en-US`,
			options
		);

		const data = await res.json();

		return data;
	};

	const { data, error } = useSWR("Details", fetcher);

	if (error) return "An Error Has Occured";
	if (!data) return "Loading";

	return (
		<div className={styles.details_section_container}>
			<fieldset className={styles.details_section_wrapper}>
				<legend>Details</legend>
				<div className={styles.inner_detail}>
					<div className={styles.inner_detail_div1}>
						<div className={styles.poster_wrapper}>
							<img
							className={styles.poster}
								src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
								alt=""
								width={425}
								height={541}
							/>
						</div>
						<div className={styles.details}>
							<p>
								<b>Title: </b>
								{data.title}
							</p>
							<p>
								<b>Release: </b>
								{data.release_date}
							</p>
							<p>
								<b>Language: </b>
								{data.original_language}
							</p>
							<p>
								<b>Status: </b>
								{data.status}
							</p>
							<p>
								<b>Vote Average: </b>
								{data.vote_average}
							</p>
							<p>
								<b>Vote Count: </b>
								{data.vote_count}
							</p>
						</div>
					</div>
					<div className={styles.inner_detail_div2}>
						<div className={styles.overview_wrapper}>
							<h4>Overview: </h4>
							<p>{data.overview}</p>
						</div>
						<div className={styles.source_wrapper}></div>
					</div>
				</div>
			</fieldset>
		</div>
	);
};

export default DetailsSection;
