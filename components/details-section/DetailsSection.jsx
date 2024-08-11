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
			cache: "no-store",
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
		const recommendationRes1 = await fetch(
			`/api/recommendation?id=${dataData.id}&page=1`,
			{ cache: "no-store" }
		);

		const recommendationData1 = await recommendationRes1.json();

		const recommendationRes2 = await fetch(
			`/api/recommendation?id=${dataData.id}&page=2`,
			{ cache: "no-store" }
		);
		const recommendationData2 = await recommendationRes2.json();

		const similarRes1 = await fetch(
			`/api/similar?id=${dataData.id}&page=1`,
			{ cache: "no-store" }
		);
		const similarData1 = await similarRes1.json();

		const similarRes2 = await fetch(
			`/api/similar?id=${dataData.id}&page=2`,
			{ cache: "no-store" }
		);
		const similarData2 = await similarRes2.json();

		const data = {
			recommendationData1,
			recommendationData2,
			similarData1,
			similarData2,
		};

		console.log(providerData.results.PH);

		return { dataData, providerData, data };
	};

	const { data, error } = useSWR("Details", fetcher);

	if (error)
		return (
			<div className={styles.details_section_container}>
				<fieldset className={styles.details_section_wrapper}>
					<legend>Details</legend>
					<div className={styles.inner_detail}>
						<h1>No Data Found. Please Try Again Later.</h1>
					</div>
				</fieldset>
			</div>
		);
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

	const flatrate = () => {
		return (data.providerData.results.PH.flatrate) ? data.providerData.results.PH.flatrate.map( (item) => {
			return (
				<div key={item.provider_id}>
						<a
							href={data.providerData.results.PH.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<p>{item.provider_name}</p>
							<img
								src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
								alt=""
							/>
						</a>
				</div>
			);}
		) : ""
	}

	const buy = () => {
		return (data.providerData.results.PH.buy) ? data.providerData.results.PH.buy.map( (item) => {
			return (
				<div key={item.provider_id}>
					<a
						href={data.providerData.results.PH.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						<p>{item.provider_name}</p>
						<img
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
							alt=""
						/>
					</a>
				</div>
			);}
		) : ""
	}

	const rent = () => {
		return data.providerData.results.PH.rent ? (
			data.providerData.results.PH.rent.map((item) => {
				return (
					<div key={item.provider_id}>
						<a
							href={data.providerData.results.PH.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<p>{item.provider_name}</p>
							<img
								src={`https://image.tmdb.org/t/p/w500/${item.logo_path}`}
								alt=""
							/>
						</a>
					</div>
				);
			})
		) : (
			""
		);
	};

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
							<p>
								{
									(data.dataData.overview) ? data.dataData.overview : "No overview Available."
								}
							</p>
						</div>
						<div className={styles.source_wrapper}>
							<fieldset
								className={
									!data.providerData.results.PH
										? styles.err_fieldset
										: ""
								}
							>
								<legend>Watch Providers</legend>
								<div className={styles.provider_wrapper}>
									{data.providerData.results.PH ? (
										<>
											{data.providerData.results.PH
												.flatrate ? (
												<div className={styles.buy}>
													<p>flatrate</p>
													{flatrate()}
												</div>
											) : (
												<span
													className={
														styles.no_display
													}
												></span>
											)}

											{data.providerData.results.PH
												.buy ? (
												<div
													className={styles.flatrate}
												>
													<p>buy</p>
													{buy()}
												</div>
											) : (
												<span
													className={
														styles.no_display
													}
												></span>
											)}

											{data.providerData.results.PH
												.rent ? (
												<div className={styles.rent}>
													<p>rent</p>
													{rent()}
												</div>
											) : (
												<span
													className={
														styles.no_display
													}
												></span>
											)}
										</>
									) : (
										<h1 className={styles.no_provider_err}>
											There Are No Providers Available in
											Your Country.
										</h1>
									)}
								</div>
							</fieldset>
						</div>
					</div>
				</div>
			</fieldset>

			{data.data ? (
				<RecommendationSection data={data.data} />
			) : (
				<p>No recommendations available</p>
			)}
		</div>
	);
};

export default DetailsSection;
