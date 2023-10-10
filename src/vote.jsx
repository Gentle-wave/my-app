import React, { useState } from "react";

export const Vote = ({ participants, onVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    // Prevent voting if the user has already voted or no candidate is selected
    if (voted || !selectedCandidate) {
      return;
    }

    // Trigger the vote action and set voted to true
    onVote(selectedCandidate);
    setVoted(true);
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
    </div>
  );
};


