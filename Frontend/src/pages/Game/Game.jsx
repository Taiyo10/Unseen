import React, { useEffect, useState } from "react";
import { getAllFacts, updateFactCount } from "../../../../Firebase/firebaseUtils"; 
import styles from "./Game.module.css"; // Import the CSS Module
import { motion, useMotionValue, useTransform } from 'framer-motion';

function Game() {
  const [facts, setFacts] = useState([]); 

  useEffect(() => {
    const fetchFacts = async () => {
      const fetchedFacts = await getAllFacts();
      if (fetchedFacts) {
        const shuffledFacts = fetchedFacts.sort(() => Math.random() - 0.5);
        setFacts(shuffledFacts);
      } else {
        setFacts([]);
      }
    };
    fetchFacts();
  }, []);

  return (
    <div>
      <h1>Game Page</h1>
      <div className={styles.factGrid}>
        {facts.map((fact, index) => (
          <Fact key={index} fact={fact} setFacts={setFacts} />
        ))}
      </div>
    </div>
  );
}

// ✅ Fact Component with X Motion Tracking
const Fact = ({ fact, setFacts }) => {
  const x = useMotionValue(0); // Track X position
  const opacity = useTransform(x, [-400, 0, 400], [0, 1, 0]);
  const rotate = useTransform(x, [-400, 400], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 300) {
      // Fact dragged beyond threshold for "seen"
      updateFactCount(fact.factId, "seen");
      removeFactFromList(fact.factId);
    }
    if (x.get() < -300) {
      // Fact dragged beyond threshold for "unseen"
      updateFactCount(fact.factId, "unseen");
      removeFactFromList(fact.factId);
    }
  };

  const removeFactFromList = (factId) => {
    setFacts((prevFacts) => prevFacts.filter((fact) => fact.factId !== factId));
  };

  return (
    <motion.div
      className={styles.factContainer}
      drag="x" // Allow dragging only in the X direction
      dragConstraints={{ left: -400, right: 400 }} // Limit dragging range
      onDragEnd={handleDragEnd} // Trigger when drag ends
      style={{ x, opacity, rotate }} // Attach motion value
    >
      {fact.text}
    </motion.div>
  );
};

export default Game;