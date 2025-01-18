import React, { useState } from "react";
import { writeFact } from "../../../../Firebase/firebaseUtils"; // Assuming writeFact is exported from your firebase config file

const AddFact = () => {
  const [factText, setFactText] = useState("");
  const [factSource, setFactSource] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!factText.trim() || !factSource.trim()) {
      setStatusMessage("Please provide both the fact text and source.");
      return;
    }

    try {
      // Call writeFact to save the fact
      await writeFact({
        text: factText.trim(),
        source: factSource.trim(),
        seenCount: 0, // Initialize with 0 for seenCount
        notSeenCount: 0, // Initialize with 0 for notSeenCount
      });

      // Clear the input fields and show success message
      setFactText("");
      setFactSource("");
      setStatusMessage("Fact added successfully!");
    } catch (error) {
      console.error("Error adding fact:", error);
      setStatusMessage("Failed to add the fact. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add a New Fact</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Fact Text:
            <textarea
              value={factText}
              onChange={(e) => setFactText(e.target.value)}
              rows={4}
              style={{ width: "100%", resize: "none", marginTop: "5px" }}
              placeholder="Enter the fact text"
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Source:
            <input
              type="text"
              value={factSource}
              onChange={(e) => setFactSource(e.target.value)}
              style={{ width: "100%", marginTop: "5px" }}
              placeholder="Enter the source of the fact"
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          Add Fact
        </button>
      </form>
      {statusMessage && (
        <p style={{ marginTop: "10px", color: statusMessage.includes("successfully") ? "green" : "red" }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default AddFact;
