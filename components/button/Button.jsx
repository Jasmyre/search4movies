import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
	return (
		<a
			href={props.href}
			className={styles.button}
		>
			{props.children}
		</a>
	);
};

Button.PropTypes = {
	href: PropTypes.string,
	children: PropTypes.element,
};

export default Button;
