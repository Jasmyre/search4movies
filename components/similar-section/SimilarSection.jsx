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




















































// "use client";

// import React from "react";
// import styles from "./SimilarSection.module.css";
// import useSWR from "swr";

// import SimilarMovies from "../recommendation-movies/RecommendationMovies";
// import Loading from "../loading/Loading";

// const SimilarSection = (props) => {
// 	const fetcher = async (url) => {
// 		const options = {
// 			method: "GET",
// 			headers: {
// 				accept: "application/json",
// 				Authorization:
// 					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODZiZWIyMmM1ZDc4YzM0NjVlNWU2Y2E0ZTc3YmMwMiIsIm5iZiI6MTcyMzAyMjAwNy44MzEzMSwic3ViIjoiNjZiMDc5ODljMTU4ZjlmNWE5NTc1NGFmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.oPWjqssCHRDNFX8_nX7FzHM2M2vwze9c77uApm-OojA",
// 			},
// 			cache: "no-cache",
// 		};

// 		const res = await fetch(
// 			`https://api.themoviedb.org/3/movie/${props.id}/similar?language=en-US&page=1`,
// 			options
// 		);

// 		if (!res.ok) {
// 			throw new Error("Network response was not ok");
// 		}

// 		const data = await res.json();
//         console.log(data)

//         const res2 = await fetch(
// 			`https://api.themoviedb.org/3/movie/${props.id}/similar?language=en-US&page=2`,
// 			options
// 		);

// 		if (!res2.ok) {
// 			throw new Error("Network response was not ok");
// 		}

// 		const data2 = await res2.json();
// 		console.log(data2);

//         return {data, data2}
// 	};

// 	const { data, error } = useSWR("Recommendation", fetcher);

// 	if (error) return "An Error Has Occured";
// 	if (!data)
// 		return (
// 			<div
// 				className={styles.popular_section_container}
// 				id="similar"
// 			>
// 				<div className={styles.popular_section_wrapper}>
// 					<div className={styles.header_wrapper}>
// 						<h1>Similar Movies</h1>
// 					</div>
// 					<hr />
// 					<div className={styles.loading_wrapper}>
// 						<Loading />
// 					</div>
// 				</div>
// 			</div>
// 		);

// 	return (
// 		<div
// 			className={styles.popular_section_container}
// 			id="similar"
// 		>
// 			<div className={styles.popular_section_wrapper}>
// 				<div className={styles.header_wrapper}>
// 					<h1>Similar Movies</h1>
// 				</div>
// 				<hr />
// 				<div className={styles.content_wrapper}>
// 					<SimilarMovies data={data} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default SimilarSection;
