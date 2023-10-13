import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Vote = ({ onVote }) => {
  const { competitionId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(null); // Add error state
  const userId = localStorage.getItem("userId");

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
        console.log('Pariticpants: ', data.participants)
        // console.log("Participants loaded successfully");
      })
      .catch((error) => {
        // setError("Error fetching participants. Please try again later.");
        console.error("Error fetching participants:", error);
      });
  }, [competitionId]);


  console.log('State Participat: ', participants)

  const handleVote = () => {
    const notify = () => toast.success('Hurray! your vote has been recorded successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  
    const errornotify = () => toast.error('oops! An error occured while taking in vote or you already voted in this competition', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    // Prevent voting if the user has already voted or no candidate is selected
    if (voted || !selectedCandidate) {
      return;
    }

    const requestBody = {
      voteesName: selectedCandidate,
    };

    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${competitionId}/vote/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
        notify();
        setSelectedCandidate("");
      })
      .catch((error) => {
        errornotify();
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
          {participants.map((participant, index) => (
            <li key={index}>{participant.userName}</li>
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

