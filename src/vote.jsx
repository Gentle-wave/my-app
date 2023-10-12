import React, { useEffect, useState } from "react";

export const Vote = ({ competitionId, onVote }) => {
  const [participants, setParticipants] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    // Fetch the list of participants when the component mounts
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${competitionId}/participants`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setParticipants(data.participants || []);
        console.log("Participants loaded successfully");
      })
      .catch((error) => {
        setError("Error fetching participants. Please try again later.");
        console.error("Error fetching participants:", error);
      });
  }, [competitionId]);

  const handleVote = () => {
    // Prevent voting if the user has already voted or no candidate is selected
    if (voted || !selectedCandidate) {
      return;
    }

    // Send a request to vote for the selected candidate
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${competitionId}/vote/${selectedCandidate}`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update UI to indicate successful vote
        setVoted(true);
        console.log("Vote recorded successfully");
      })
      .catch((error) => {
        setError("Error recording vote. Please try again later.");
        console.error("Error recording vote:", error);
      });
  };

  return (
    <div className="vote">
      <h2>Vote for a Candidate</h2>
      <p>Number of Participants: {participants.length}</p>

      <div className="candidate-list">
        <h3>Participants:</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </div>

      <label htmlFor="candidate">Enter Candidate Name:</label>
      <input
        type="text"
        id="candidate"
        value={selectedCandidate}
        onChange={(e) => setSelectedCandidate(e.target.value)}
        placeholder="Candidate Name"
      />

      <button onClick={handleVote} disabled={voted}>
        {voted ? "Voted" : "Vote"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

