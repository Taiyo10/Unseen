import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./Explore.module.css"; // Import your CSS module for styling
import { getRandUnknown } from "../../../../Firebase/firebaseUtils";

// Sample data - replace this with your actual data
function Explore() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchrandFacts = async () => {
      try {
        const factsData = await getRandUnknown(4); // Fetch the data
        console.log("Fetched facts:", factsData);
        setData(factsData || []); // Set the data state (fallback to an empty array)
      } catch (error) {
        console.error("Error fetching facts:", error); // Log errors for debugging
      }
    }
    fetchrandFacts();
  }, []);

  return (
    <div className={styles.exploreContainer}>
      <br>
      </br>
      <h1>Explore the Unknown</h1>
      <p className={styles.pageDescription}>
        Dive into a collection of fascinating and lesser-known facts, waiting to be explored. Scroll down to discover more!
      </p>
      <div className={styles.grid}>
        {data.map((fact) => (
          <div
            key={fact.factId}
            className={styles.card}
            onClick={() => navigate(`/game/${fact.id}`)}
            style={{ backgroundColor: "#D3D3D3" }} // Set background color to light gray
          >
            <div className={styles.cardContent}>
              <h3>{fact.text}</h3>
              <p>{fact.source}</p>
              <p>{fact.unseenPercent}% of people did not know this fact</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;