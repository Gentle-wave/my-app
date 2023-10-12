import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinCompetition = ({ competitionId }) => {
  const userId = localStorage.getItem("userId");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add the user to the competition
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${competitionId}/addUser/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error joining competition:', error);
        setMessage('Error joining competition');
      });
  };

  return (
    <div className="join-competition">
      <h2>Join Competition</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Your Name</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <button type="submit">Join Competition</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinCompetition;
