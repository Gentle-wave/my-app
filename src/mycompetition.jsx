import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    // Delete the competition and update the state if successful
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Successfully deleted, update the state
          setUserCompetitions(userCompetitions.filter((comp) => comp.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error deleting competition:', error);
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
              onClick={() => handleVoteresults(competition.id)} // Add click handler
              style={{ cursor: "pointer" }} // Change cursor to pointer
            >
              {competition.title}
              <br />
              <br />
              {competition.description}
              <button onClick={() => handleDeleteCompetition(competition.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No competitions created yet.</p>
        )}
      </ul>
    </div>
  );

  // return (
  //   <div className="my-competitions">
  //     <h2>My Competitions</h2>
  //     <ul>
  //       {userCompetitions && userCompetitions.length > 0 ? (
  //         userCompetitions.map((competition) => (
  //           <li key={competition.id}>
  //             {competition.title}
  //             <br></br>
  //             <br></br>
  //             {competition.description}
  //             <button onClick={() => handleDeleteCompetition(competition.id)}>
  //               Delete
  //             </button>
  //           </li>
  //         ))
  //       ) : (
  //         <p>No competitions created yet.</p>
  //       )
  //       }
  //     </ul>
  //   </div>
  // );
};

export default MyCompetitions;
