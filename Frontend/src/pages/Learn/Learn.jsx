import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Learn.module.css"; // Import your CSS module
import { getRandUnknown } from "../../../../Firebase/firebaseUtils";

function Learn() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchrandFacts = async () => {
      try {
        const factsData = await getRandUnknown(6); // Fetch the data
        console.log("Fetched facts:", factsData);
        setData(factsData || []); // Fallback to an empty array
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };
    fetchrandFacts();
  }, []);

  const handleFactClick = (link) => {
    window.open(link, "_blank"); // Opens the link in a new tab
  };

  return (
    <div className={styles.learnContainer}>
      <h1>Learn the Unknown</h1>
      <p className={styles.pageDescription}>
        Explore the world through a new perspective. Click to find out more!
      </p>
      <div className={styles.grid}>
        {data.map((fact) => (
          <div
            key={fact.factId}
            className={styles.card}
            onClick={(e) => { e.stopPropagation(); handleFactClick(fact.source);}}
          >
            <div className={styles.cardContent}>
              <h3>{fact.text}</h3>
              <p className={styles.source}>{fact.sourceShort}</p>
              <p className={styles.unseenPercent}>
                {fact.unseenPercent}% of people did not know this fact
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
