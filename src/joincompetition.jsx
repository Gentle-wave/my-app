import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const JoinCompetition = () => {
  const { competitionId } = useParams();
  const userId = localStorage.getItem("userId");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const notify = () => toast.success('Hurray! You have successfully joined the competition', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })

    const errornotify = () => toast.error('Error joining competition. Please and try again..', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
          setUserName("");
        }
        notify();
      })
      .catch((error) => {
        console.error('Error joining competition:', error);
        errornotify();
      });
  };

  return (
    <div className="join-competition">
      <h2>Join Competition {competitionId}</h2>
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

export default JoinCompetition;
