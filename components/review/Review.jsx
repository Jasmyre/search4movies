"use client";

import React from "react";
import styles from "./Review.module.css";
import { useInView } from "react-intersection-observer";

const Review = (props) => {
	const { ref, inView } = useInView({
		triggerOnce: false, 
		threshold: 0.1, 
	});

	return (
		<div
			className={`${styles.comment_card} ${inView ? styles.visible : ""}`}
			ref={ref}
		>
			<div className={styles.comment_header}>
				<div className={styles.card_pfp_wrapper}>
					<i className="fa-solid fa-user"></i>
				</div>
				<div className={styles.card_info_wrapper}>
					<h2>{props.name}</h2>
					<p>{props.date}</p>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.comment_content}>
				<p>{props.comment}</p>
			</div>
		</div>
	);
};

export default Review;
