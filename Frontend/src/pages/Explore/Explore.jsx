import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./Explore.module.css"; // Import your CSS module for styling

// Sample data - replace this with your actual data
const fetchData = () => {
  return [
    {
      id: 1,
      title: "Interesting Fact 1",
      description: "This is a short description of the first interesting fact.",
    },
    {
      id: 2,
      title: "Interesting Fact 2",
      description: "This is a short description of the second interesting fact.",
    },
    {
      id: 3,
      title: "Interesting Fact 3",
      description: "This is a short description of the third interesting fact.",
    },
    {
      id: 4,
      title: "Interesting Fact 4",
      description: "This is a short description of the fourth interesting fact.",
    },
    {
      id: 5,
      title: "Interesting Fact 5",
      description: "This is a short description of the fifth interesting fact.",
    },
    // Add more objects with facts
  ];
};

function Explore() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const factsData = fetchData(); // Fetch the data
    setData(factsData); // Set the data state
  }, []);

  return (
    <div className={styles.exploreContainer}>
      <h1>Explore Facts</h1>
      <div className={styles.grid}>
        {data.map((fact) => (
          <div
            key={fact.id}
            className={styles.card}
            onClick={() => navigate(`/game/${fact.id}`)}
            style={{ backgroundColor: "#D3D3D3" }} // Set background color to light gray
          >
            <div className={styles.cardContent}>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
