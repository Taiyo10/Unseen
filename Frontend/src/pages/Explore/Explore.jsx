import React, { useEffect, useState } from "react";
import { getAllFacts, updateFactCount } from "../../../../Firebase/firebaseUtils"; 
import styles from "./Explore.module.css"; // Import the CSS Module
import { motion, useMotionValue, useTransform } from "framer-motion";

function Explore() {
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
    <div className={styles.container}>
      <div className={styles.holder}><div>&lt;&lt; Swipe Unseen</div><div>Swipe Seen &gt;&gt;</div></div>
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
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);
  const rotate = useTransform(x, [-300, 300], [-18, 18]);

  const handleDragEnd = () => {
    if (x.get() > 150) {
      updateFactCount(fact.factId, "seen");
      removeFactFromList(fact.factId);
    }
    if (x.get() < -150) {
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
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, opacity, rotate }}
    >
      {fact.text}
    </motion.div>
  );
};

export default Explore;