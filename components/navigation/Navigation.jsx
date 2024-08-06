import React from "react";
import PropTypes from 'prop-types'

import Button from "../button/Button";

import styles from "./Navigation.module.css";

const Navigation = (props) => {
	const navigations = props.navigations.map((nav) => {
		return (
			<li key={nav}>
				<a
					href={`/home/#${nav}`}
					className={styles.a}
				>
					<span>{nav}</span>
				</a>
			</li>
		);
	});
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<a
						href="/"
						className={styles.a}
					>
						<span>Home</span>
					</a>
				</li>
				{navigations}
			</ul>
		</nav>
	);
};

Navigation.PropTypes = {
	navigations: PropTypes.array.isRequired,
};

export default Navigation;
