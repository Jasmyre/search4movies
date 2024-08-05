
import styles from "./HamburgerBar.module.css";
import React from 'react';

const HamburgerBar = () => {
  return (
		<label className={styles.burger} htmlFor="burger">
      <input type="checkbox" id="burger"/>
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
}

export default HamburgerBar;