// FactsForm.js
import React, { useState } from 'react';
import { writeFact } from '../../../../Firebase/firebaseUtils'; // Import the writeFact function

const FactsForm = () => {
  const [factText, setFactText] = useState(""); // State to hold the fact text input
  const [loading, setLoading] = useState(false); // Loading state to track progress
  const [message, setMessage] = useState(""); // State to show messages (success or error)

  // Handle fact submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (!factText.trim()) {
      setMessage("Fact text cannot be empty!");
      return;
    }

    const factId = `fact${Date.now()}`; // Generate a unique fact ID (optional)
    setLoading(true); // Start loading
    try {
      // Call the writeFact function to add the fact to Firebase
      await writeFact(factId, factText, "Anonymous");
      setMessage("Fact added successfully!");
      setFactText(""); // Reset the input field
    } catch (error) {
      setMessage("Error adding fact.");
      console.error(error);
    }
    setLoading(false); // Stop loading
  };

  return (
    <div>
      <h1>Submit a New Fact</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={factText}
          onChange={(e) => setFactText(e.target.value)}
          placeholder="Enter your fact here"
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding Fact..." : "Submit Fact"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FactsForm;
