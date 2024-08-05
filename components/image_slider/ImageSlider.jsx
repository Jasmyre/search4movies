import React from 'react'
import styles from "./ImageSlider.module.css"

const ImageSlider = () => {
  return (
    <div className={styles.slider}>
        <span className={styles.box}></span>
        <span className={styles.box}></span>
        <span className={styles.box}></span>
    </div>
)
}

export default ImageSlider