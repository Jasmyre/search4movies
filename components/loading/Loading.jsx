import React from "react";
import styles from './Loading.module.css'

const Loading = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.shadow}></div>
			<div className={styles.shadow}></div>
			<div className={styles.shadow}></div>
		</div>
	);
};

export default Loading;
