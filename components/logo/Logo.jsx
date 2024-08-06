import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import styles from "./Logo.module.css";

const Logo = (props) => {
	const color = props.color;

	return (
		<a
			href="/"
			className={color == "white" ? styles.white : styles.theme}
		>
			<p>Search4Movies</p>
		</a>
	);
};

Logo.PropTypes = {
	color: PropTypes.string,
};

export default Logo;
