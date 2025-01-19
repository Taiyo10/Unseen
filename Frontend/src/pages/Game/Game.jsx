import React, { useEffect, useState } from "react";
import { getAllFacts, updateFactCount } from "../../../../Firebase/firebaseUtils";
import styles from "./Game.module.css"; // Import the CSS Module
import { motion, useMotionValue, useTransform } from "framer-motion";

function Game() {
  const [facts, setFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0); // Track the index of the front fact
  const [previousFact, setPreviousFact] = useState(null); // Store the previous fact
  const [showPercentages, setShowPercentages] = useState(false); // Manage visibility of percentages

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

  const handleFactRemoval = (factId) => {
    // Store the fact that was removed to show in the shadow div
    setPreviousFact(facts[currentFactIndex]);
    setShowPercentages(true); // Show percentages when a fact is removed
  
    // Update the state to move to the next fact when the current one is removed
    setCurrentFactIndex((prevIndex) => prevIndex + 1);
  
    // Optionally, call a function to update the fact count in the backend
    updateFactCount(factId, "seen"); // or "unseen" based on your logic
  
    // Hide percentages after a longer delay (e.g., 2 seconds)
    setTimeout(() => setShowPercentages(false), 1500); // Change the delay here (e.g., 2000ms = 2 seconds)
  };

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div>&lt;&lt; Swipe Unseen</div>
        <div>Swipe Seen &gt;&gt;</div>
      </div>
      <div className={styles.factGrid}>
        {previousFact && (
          <div className={styles.shadow}>
            <p
              className={`${styles.shadowText} ${showPercentages ? styles.visible : ""}`}
            >
              Unseen: {previousFact.unseenPercent}%
            </p>
            <p
              className={`${styles.shadowText} ${showPercentages ? styles.visible : ""}`}
            >
              Seen: {previousFact.seenPercent}%
            </p>
          </div>
        )}
        {facts.length > 0 && (
          <Fact
            key={facts[currentFactIndex]?.factId}
            fact={facts[currentFactIndex]}
            setFacts={setFacts}
            onFactRemoved={handleFactRemoval}
            isFirstFact={currentFactIndex === 0} // Check if this is the first fact
          />
        )}
      </div>
    </div>
  );
}

const Fact = ({ fact, onFactRemoved, isFirstFact }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);
  const rotate = useTransform(x, [-300, 300], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 150) {
      onFactRemoved(fact.factId);
    }
    if (x.get() < -150) {
      onFactRemoved(fact.factId);
    }
  };

  return (
    <motion.div
      className={styles.factContainer}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, rotate }}
      initial={{ opacity: isFirstFact ? 1 : 0 }} // Start with opacity 1 if it's the first fact
      animate={{ opacity: isFirstFact ? 1 : 1 }} // No transition if it's the first fact
      transition={isFirstFact ? {} : { duration: 0.25, ease: "easeInOut", delay: 1.5 }} // No delay or transition for the first fact
    >
      {fact.text}
    </motion.div>
  );
};

export default Game;
