"use client";

import React from "react";
import styles from "./DetailsSection.module.css";
import useSWR from "swr";
import Loading from "../loading/Loading";
import RecommendationSection from "../recommendation-section/RecommendationSection";
import { unstable_noStore as noStore } from "next/cache";

const DetailsSection = (props) => {
	// Disable caching for this component
	noStore();

	// Fetcher function for useSWR
	const fetcher = async () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMjkyODk3My4wNzQxMiwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.FtDKh6tJRrHz-13hHF2shi7SfvUU7tG82dK7p7DKoZU",
			},
		};

		// Fetch movie details
		const dataRes = await fetch(
			`https://api.themoviedb.org/3/movie/${props.id}?language=en-US`,
			options
		);
		const dataData = await dataRes.json();

		// Fetch watch providers
		const providerRes = await fetch(
			`https://api.themoviedb.org/3/movie/${dataData.id}/watch/providers`,
			options
		);
		const providerData = await providerRes.json();

		// Fetch recommendations via your own API
		const recommendationRes = await fetch(
			`/api/recommendation?id=${
				dataData.id
			}&page=1`,
			{ cache: "no-store" }
		);
		const recommendationData = await recommendationRes.json();
		console.log(recommendationData);
		

		return { dataData, providerData, recommendationData };
	};

	const { data, error } = useSWR("Details", fetcher);

	if (error) return "An Error Has Occurred";
	if (!data)
		return (
			<div className={styles.details_section_container}>
				<fieldset className={styles.details_section_wrapper}>
					<legend>Details</legend>
					<div className={styles.inner_detail}>
						<Loading />
					</div>
				</fieldset>
			</div>
		);

	if (!data.providerData.results.PH || !data.providerData.results.PH.flatrate)
		return (
			<div className={styles.details_section_container}>
				<fieldset className={styles.details_section_wrapper}>
					<legend>Details</legend>
					<div className={styles.inner_detail}>
						<div className={styles.inner_detail_div1}>
							<div className={styles.poster_wrapper}>
								<img
									className={styles.poster}
									src={`https://image.tmdb.org/t/p/w500/${data.dataData.poster_path}`}
									alt=""
									width={425}
									height={541}
								/>
							</div>
							<div className={styles.details}>
								<p>
									<b>Title: </b>
									{data.dataData.title}
								</p>
								<p>
									<b>Release: </b>
									{data.dataData.release_date}
								</p>
								<p>
									<b>Language: </b>
									{data.dataData.original_language}
								</p>
								<p>
									<b>Status: </b>
									{data.dataData.status}
								</p>
								<p>
									<b>Vote Average: </b>
									{data.dataData.vote_average}
								</p>
								<p>
									<b>Vote Count: </b>
									{data.dataData.vote_count}
								</p>
							</div>
						</div>
						<div className={styles.inner_detail_div2}>
							<div className={styles.overview_wrapper}>
								<h4>Overview: </h4>
								<p>{data.dataData.overview}</p>
							</div>
							<div className={styles.source_wrapper}>
								<fieldset className={styles.err_fieldset}>
									<legend>Watch Providers</legend>
									<div className={styles.provider_wrapper}>
										<h1 className={styles.no_provider_err}>
											There Are No Providers Available in
											Your Country.
										</h1>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</fieldset>
				{data.recommendationData ? (
					<RecommendationSection data={data.recommendationData} />
				) : (
					<p>No recommendations available</p>
				)}
			</div>
		);

	return (
		<div className={styles.details_section_container}>
			<fieldset className={styles.details_section_wrapper}>
				<legend>Details</legend>
				<div className={styles.inner_detail}>
					<div className={styles.inner_detail_div1}>
						<div className={styles.poster_wrapper}>
							<img
								className={styles.poster}
								src={`https://image.tmdb.org/t/p/w500/${data.dataData.poster_path}`}
								alt=""
								width={425}
								height={541}
							/>
						</div>
						<div className={styles.details}>
							<p>
								<b>Title: </b>
								{data.dataData.title}
							</p>
							<p>
								<b>Release: </b>
								{data.dataData.release_date}
							</p>
							<p>
								<b>Language: </b>
								{data.dataData.original_language}
							</p>
							<p>
								<b>Status: </b>
								{data.dataData.status}
							</p>
							<p>
								<b>Vote Average: </b>
								{data.dataData.vote_average}
							</p>
							<p>
								<b>Vote Count: </b>
								{data.dataData.vote_count}
							</p>
						</div>
					</div>
					<div className={styles.inner_detail_div2}>
						<div className={styles.overview_wrapper}>
							<h4>Overview: </h4>
							<p>{data.dataData.overview}</p>
						</div>
						<div className={styles.source_wrapper}>
							<fieldset>
								<legend>Watch Providers</legend>
								<div className={styles.provider_wrapper}>
									{data.providerData.results.PH.flatrate.map(
										(item) => {
											return (
												<a
													href={
														data.providerData
															.results.PH.link
													}
													key={item.provider_id}
													target="_blank"
													rel="noopener noreferrer"
												>
													<img
														src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
														alt=""
													/>
												</a>
											);
										}
									)}
								</div>
							</fieldset>
						</div>
					</div>
				</div>
			</fieldset>

			{data.recommendationData ? (
				<RecommendationSection data={data.recommendationData} />
			) : (
				<p>No recommendations available</p>
			)}
		</div>
	);
};

export default DetailsSection;
