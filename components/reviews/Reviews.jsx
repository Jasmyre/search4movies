"use client";

import React from "react";
import styles from "./Reviews.module.css";
import useSWR from "swr";
import { unstable_noStore as noStore } from "next/cache";

import Review from "../review/Review";

const fetcher = async (url) => {
	noStore();
	const res = await fetch(url, { cache: "no-store" });
	const data = await res.json();
	console.log(data);
	

	return data;
};

const Reviews = (props) => {
	noStore();

	const { data, error } = useSWR(`/api/get-reviews?id=${props.id}`, fetcher);

	

	const date = (createdAt) => {
		function decodeTimestamp(isoString) {
			const date = new Date(isoString);

			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			const hours = String(date.getHours()).padStart(2, "0");
			const minutes = String(date.getMinutes()).padStart(2, "0");
			const seconds = String(date.getSeconds()).padStart(2, "0");
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		}

		const isoTimestamp = createdAt;

		const customFormattedDate = decodeTimestamp(isoTimestamp);
		return customFormattedDate
	}

	if (error)
		return (
			<section className={styles.comment_section_container}>
				<div className={styles.comment_section_wrapper}>
					<div className={styles.div1}>
						<fieldset className={styles.fieldset}>
							<legend>Leave A Comment!</legend>
							<form
								action=""
								className={styles.form}
							>
								<div className={styles.form_name_wrapper}>
									<label htmlFor="name_input">Name:</label>
									<input
										type="text"
										id="name_input"
										placeholder="Spongebob"
										className={styles.input}
									/>
								</div>
								<div className={styles.form_comment_wrapper}>
									<label htmlFor="comment_input">
										Comment:
									</label>
									<textarea
										id="commont_input"
										placeholder="Comment..."
										required
										className={styles.input}
										rows={5}
									></textarea>
								</div>
								<div className={styles.submit_wrapper}>
									<input
										type="submit"
										className={`${styles.input} ${styles.submit}`}
									/>
								</div>
							</form>
						</fieldset>
					</div>
					<fieldset className={styles.div2}>
						<legend>Comments</legend>
						<div className={styles.comment_cards_container}>
							<h1>No Data Found. Please Try Again Later.</h1>
						</div>
					</fieldset>
				</div>
			</section>
		);
	if (!data)
		return (
			<section className={styles.comment_section_container}>
				<div className={styles.comment_section_wrapper}>
					<div className={styles.div1}>
						<fieldset className={styles.fieldset}>
							<legend>Leave A Comment!</legend>
							<form
								action=""
								className={styles.form}
							>
								<div className={styles.form_name_wrapper}>
									<label htmlFor="name_input">Name:</label>
									<input
										type="text"
										id="name_input"
										placeholder="Spongebob"
										className={styles.input}
									/>
								</div>
								<div className={styles.form_comment_wrapper}>
									<label htmlFor="comment_input">
										Comment:
									</label>
									<textarea
										id="commont_input"
										placeholder="Comment..."
										required
										className={styles.input}
										rows={5}
									></textarea>
								</div>
								<div className={styles.submit_wrapper}>
									<input
										type="submit"
										className={`${styles.input} ${styles.submit}`}
									/>
								</div>
							</form>
						</fieldset>
					</div>
					<fieldset className={styles.div2}>
						<legend>Comments</legend>
						<div className={styles.comment_cards_container}>
							<h1>Loading...</h1>
						</div>
					</fieldset>
				</div>
			</section>
		);

	return (
		<section className={styles.comment_section_container}>
			<div className={styles.comment_section_wrapper}>
				
				<fieldset className={styles.div2}>
					<legend>Reviews</legend>
					<div className={styles.comment_cards_container}>
						{data.results && data.results.length > 0 ?
						data.results.map((item) => {
							return (
								<Review
									key={item.id}
									name={item.author_details.username}
									comment={item.content}
									date={date(item.created_at)}
								/>
							);
						}) : <h1>No Reviews Available</h1>
						}
					</div>
				</fieldset>
			</div>
		</section>
	);
};

export default Reviews;
