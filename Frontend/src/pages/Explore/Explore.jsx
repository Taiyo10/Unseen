import React, { useEffect, useState } from "react";
import { getAllFacts } from "../../../../Firebase/firebaseUtils"; // Import the getAllFacts function

const DisplayFacts = () => {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    const fetchFacts = async () => {
      const fetchedFacts = await getAllFacts();
      if (fetchedFacts) {
        setFacts(fetchedFacts);
      } else {
        setFacts([]); // If no facts are found, set to an empty array
      }
    };

    fetchFacts(); // Call the fetchFacts function
  }, []);

  return (
    <div>
      <h1>Facts List</h1>
      {facts.length > 0 ? (
        <ul>
          {facts.map((fact) => (
            <li key={fact.factId}>{fact.text}</li>
          ))}
        </ul>
      ) : (
        <p>No facts found!</p>
      )}
    </div>
  );
};

export default DisplayFacts;
