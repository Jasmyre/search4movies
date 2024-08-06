import React from 'react'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
		<div className={styles.hero_container}>
			<div className={styles.hero_wrapper}>
				<h1>Your Ultimate Movie Discovery Tool</h1>
				<p>
					Explore genres, read reviews, and discover new favorites
					with just a few clicks. the go-to platform for all your
					movie searching needs.
				</p>
			</div>
		</div>
  );
}

export default HeroSection