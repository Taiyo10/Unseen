import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const DisplayFacts = () => {
  const [facts, setFacts] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const factsRef = ref(database, "facts"); // Reference to the "facts" node in the database
    const unsubscribe = onValue(factsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Transform data into an array of { id, text } objects
        const factsArray = Object.entries(data).map(([id, fact]) => ({
          id,
          text: fact.text,
        }));
        setFacts(factsArray);
      } else {
        setFacts([]); // If no facts exist, set to an empty array
      }
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [database]);

  return (
    <div>
      <h1>Facts List</h1>
      {facts.length > 0 ? (
        <ul>
          {facts.map((fact) => (
            <li key={fact.id}>{fact.text}</li>
          ))}
        </ul>
      ) : (
        <p>No facts found!</p>
      )}
    </div>
  );
};

export default DisplayFacts;
