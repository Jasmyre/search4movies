import React from 'react'

import Logo from '../logo/Logo'
import Navigation from '../navigation/Navigation'

import styles from './FooterSection.module.css'

const FooterSection = () => {
  return (
		<div className={styles.footer_section}>
			<div className={styles.upper_wrapper}>
				<div className={styles.logo_wrapper}>
					<Logo />
				</div>
				<div className={styles.nav_wrapper}>
					<Navigation
						navigations={['popular', 'category']}
					/>
				</div>
				<div className={styles.social_wrapper}>
					<i className="fa-brands fa-square-facebook"></i>
					<i className="fa-brands fa-square-instagram"></i>
					<i className="fa-brands fa-square-x-twitter"></i>
					<i className="fa-brands fa-linkedin"></i>
					<i className="fa-brands fa-square-youtube"></i>
				</div>
			</div>
			<div className={styles.lower_wrapper}>
				<p>&copy; 2024 Search4Moves. All Rights Reserved. Designed By Jasmyre.</p>
			</div>
		</div>
  );
}

export default FooterSection