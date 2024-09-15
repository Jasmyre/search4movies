"use client";

import React, { useState } from "react";
import styles from "./DetailsSection.module.css";
import useSWR from "swr";
import Loading from "../loading/Loading";
import RecommendationSection from "../recommendation-section/RecommendationSection";
import { unstable_noStore as noStore } from "next/cache";
import Reviews from "../reviews/Reviews";

const DetailsSection = (props) => {
	// Disable caching for this component
	noStore();

	const [currentCountry, setCurrentCountry] = useState("PH");
	
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

		const dataRes = await fetch(
			`https://api.themoviedb.org/3/movie/${props.id}?language=en-US`,
			options
		);
		const dataData = await dataRes.json();

		const providerRes = await fetch(
			`https://api.themoviedb.org/3/movie/${dataData.id}/watch/providers`,
			options
		);

		const providerData = await providerRes.json();

		const countriesRes = await fetch(
			`https://api.themoviedb.org/3/configuration/countries?language=en-US`,
			options
		);

		const countriesData = await countriesRes.json();

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

		const keywordsRes = await fetch(
			`/api/keywords?id=${dataData.id}`,
			{ cache: "no-store" }
		);
		const keywordsData = await keywordsRes.json();


		return { dataData, providerData, data, keywordsData, countriesData };
	};

	const { data, error } = useSWR("Details", fetcher);

	if (error) {
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
	}
	if (!data) {
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
	}


	const countries = [];
	data.countriesData.forEach((element) => {
		countries.push(element);
	});

	countries.sort((a, b) => {
		const nameA = a.english_name.toLowerCase();
		const nameB = b.english_name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	const handleCountryChange = (e) => {
		setCurrentCountry(e.target.value)
		console.log(currentCountry);
		
	};


		

	const flatrate = () => {
		return data.providerData.results[currentCountry].flatrate
			? data.providerData.results[currentCountry].flatrate.map((item) => {
					return (
						<div key={item.provider_id}>
							<a
								href={data.providerData.results[currentCountry].link}
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
			: "";
	};

	const buy = () => {
		return data.providerData.results[currentCountry].buy
			? data.providerData.results[currentCountry].buy.map((item) => {
					return (
						<div key={item.provider_id}>
							<a
								href={data.providerData.results[currentCountry].link}
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
			: "";
	};

	const rent = () => {
		return data.providerData.results[currentCountry].rent
			? data.providerData.results[currentCountry].rent.map((item) => {
					return (
						<div key={item.provider_id}>
							<a
								href={data.providerData.results[currentCountry].link}
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
			: "";
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
						<div className={styles.keywords_wrapper}>
							{data.keywordsData ? (
								data.keywordsData.keywords.map((keyword) => {
									return (
										<span
											key={keyword.name}
											className={styles.keyword}
										>
											{keyword.name}
										</span>
									);
								})
							) : (
								<span className={styles.no_display}></span>
							)}
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
								{data.dataData.overview
									? data.dataData.overview
									: "No overview Available."}
							</p>
						</div>
						<div className={styles.source_wrapper}>
							<fieldset
								className={
									!data.providerData.results[currentCountry]
										? styles.err_fieldset
										: ""
								}
							>
								<legend>Watch Providers</legend>
								<div className={styles.provider_wrapper}>
									<div className={styles.drop_down_wrapper}>
										<h3>Country</h3>
										<select
											name="region"
											id="region"
											onChange={(e) => {
												handleCountryChange(e);
											}}
										>
											{
												countries.map(country => {
													return (country.iso_3166_1 == "PH") ? 
														(<option key={country.iso_3166_1} value={country.iso_3166_1} selected >{country.english_name}</option>) :
														(<option key={country.iso_3166_1} value={country.iso_3166_1} >{country.english_name}</option>)
												})
											}
										</select>
									</div>
									{data.providerData.results[currentCountry] ? (
										<>
											{data.providerData.results[currentCountry]
												.flatrate ? (
												<div
													className={`${styles.buy} ${styles.prov}`}
												>
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

											{data.providerData.results[currentCountry]
												.buy ? (
												<div
													className={`${styles.flatrate} ${styles.prov}`}
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

											{data.providerData.results[currentCountry]
												.rent ? (
												<div
													className={`${styles.rent} ${styles.prov}`}
												>
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
			<Reviews id={data.dataData.id} />
		</div>
	);
};

export default DetailsSection;
