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
        const factsData = await getRandUnknown(); // Fetch the data
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
      <h1>Explore Facts</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;