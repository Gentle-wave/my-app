import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyCompetitions = ({ onDeleteCompetition }) => {
  const userId = localStorage.getItem("userId");
  const [userCompetitions, setUserCompetitions] = useState([]);
  const navigate = useNavigate();

  const handleVoteresults = (competitionId) => {
    // Navigate to the "joincompetition" page with the competitionId as a parameter
    navigate(`/voteresults/${competitionId}`);
  };

  useEffect(() => {
    // Fetch the user's competitions when the component mounts
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/singleusercompetition/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserCompetitions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching competitions:', error);
      });
  }, [userId]);

  const handleDeleteCompetition = (id) => {
    const notify = () => toast.info('Competition has been deleted', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
    const errornotify = () => toast.error('Error deleting event. Please try again in a bit', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

    // Delete the competition and update the state if successful
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Successfully deleted, update the state
          setUserCompetitions(userCompetitions.filter((comp) => comp.id !== id));
          notify();
        }
      })
      .catch((error) => {
        console.error('Error deleting competition:', error);
        errornotify();
      });
  };

  return (
    <div className="my-competitions">
      <h2>My Competitions</h2>
      <ul>
        {userCompetitions && userCompetitions.length > 0 ? (
          userCompetitions.map((competition) => (
            <li
              key={competition.id}
              onClick={() => handleVoteresults(competition.id)} // Keep the click handler for the entire li
              style={{ cursor: "pointer" }}
            >
              {competition.title}
              <br />
              <br />
              {competition.description}
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation
                handleDeleteCompetition(competition.id);
              }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No competitions created yet.</p>
        )}
      </ul>
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

export default MyCompetitions;
