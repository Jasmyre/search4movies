"use client";

import React, {useRef} from "react";
import styles from "./CommentSection.module.css";
import useSWR from "swr";
import { unstable_noStore as noStore } from "next/cache";

import CommentCard from "../commend-card/CommentCard";

const fetcher = async (url) => {
	noStore()
	const res = await fetch(url, {cache: "no-store"});
	const data = await res.json();
	
	return data;
};

const CommentSection = () => {
	noStore();
	const {data, error, mutate} = useSWR("/api/get-comment-data", fetcher);
	const comment = useRef(null);
	const name = useRef(null);
	const submit = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (comment.current.value) {
			const commentVal = comment.current.value.trim();
			let nameVal = name.current.value || "Guest";

			if (!commentVal) return console.log("no comment yet");

			try {
				await fetch(
					`/api/post-comment?name=${nameVal}&comment=${commentVal}`
				);
				name.current.value = "";
				comment.current.value = "";
				mutate(); 
			} catch (error) {
				console.error("Error submitting comment:", error);
			}
		}
	}


	if (error) return (
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
								<label htmlFor="comment_input">Comment:</label>
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
	if (!data) return (
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
								<label htmlFor="comment_input">Comment:</label>
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
									ref={name}
								/>
							</div>
							<div className={styles.form_comment_wrapper}>
								<label htmlFor="comment_input">Comment:</label>
								<textarea
									id="commont_input"
									placeholder="Comment..."
									required
									className={styles.input}
									rows={5}
									ref={comment}
								></textarea>
							</div>
							<div className={styles.submit_wrapper}>
								<input
									type="submit"
									className={`${styles.input} ${styles.submit}`}
									ref={submit}
									onClick={(e) => {handleSubmit(e)}}
								/>
							</div>
						</form>
					</fieldset>
				</div>
				{/* <div className={styles.div2}> */}
				<fieldset className={styles.div2}>
					<legend>Comments ( {data.data.rowCount} )</legend>
					<div className={styles.comment_cards_container}>
						{
							data.data.rows.map((item) => {
								return(
								<CommentCard key={item.id} name={item.name} comment={item.comment} date={item.date} />)
							})
						}
					</div>
				</fieldset>
				{/* </div> */}
			</div>
		</section>
	);
};

export default CommentSection;
