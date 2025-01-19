import React from 'react';
import styles from './Home.module.css'; // Import the CSS module for styling
import { useNavigate } from 'react-router-dom'; // For navigation between pages

function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className={styles.homeContainer}>
      {/* Background Image and Container */}
      
      {/* Text Section */}
      <div className={styles.textContainer}>
        <h1>UNSEEN</h1>
        <p className={styles.quote}>Discover the Facts That Matter</p>
        <button
          className={styles.startButton}
          onClick={() => navigate('./pages/Game')} // Navigate to the "Game" page
        >
          Start
        </button>
      </div>
      
      {/* Tenor GIF Embed (if needed in the future) */}
    </div>
  );
}

export default Home;