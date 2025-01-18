import React from 'react';
import styles from './Home.module.css'; // Import the CSS module for styling
 // Import the PNG image

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Background Image */}
      <div className={styles.imageContainer}>
      <img
  src="./pages/earth-1303628_1280.png" // Assuming the image is in the public folder
  alt="Background Image"
  className={styles.image}
/>

        />
      </div>
      
      {/* Text and Quotation */}
      <div className={styles.textContainer}>
        <h1>Your Website Name</h1>
        <p className={styles.quote}>“A short inspirational quotation”</p>
        <button className={styles.startButton} onClick={() => window.location.href = '/next-page'}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Home;
