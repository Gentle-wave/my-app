// import React from "react";
// import "./Das.css"

// export const Dashboard = ({ user, competitions, onProfileClick, onCreateCompetitionClick, onVote }) => {
//   const userId = localStorage.getItem("userId");
//   return (
//     <div className="dashboard">
//       <h2>Hello, {userId}</h2>
//       <div className="profile-icon" onClick={onProfileClick}>
//         {/* Add an icon for the user's profile */}
//         <i className="fa fa-user"></i>
//       </div>
//       <p>Welcome to the Luminance competition page!</p>
      
//       <h3>Ongoing Competitions</h3>
//       <ul>
//         {competitions.map((competition) => (
//           <li key={competition.id}>
//             {competition.name}
//             <button onClick={() => onVote(competition.id)}>Vote</button>
//           </li>
//         ))}
//       </ul>
      
//       <button onClick={onCreateCompetitionClick}>Create New Competition</button>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import "./Das.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ user, onProfileClick, onCreateCompetitionClick, onVote }) => {
  const userId = localStorage.getItem("userId");
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch competitions from the API when the component mounts
    fetch("https://voting-system-bdvi.onrender.com/api/competitions")
      .then((response) => response.json())
      .then((data) => setCompetitions(data.competitions || [])) // Ensure competitions is an array
      .then (console.log('success'))
      .catch((error) => console.error("Error fetching competitions:", error));
  }, []);

  const handleCreateCompetitionClick = () => {
    // Navigate to the "createCompetition" page when the button is clicked
    navigate("/createCompetition");
  };

  return (
    <div className="dashboard">
      <h2>Hello, {userId}</h2>
      <div className="profile-icon" onClick={onProfileClick}>
        {/* Add an icon for the user's profile */}
        <i className="fa fa-user"></i>
      </div>
      <p>Welcome to the Luminance competition page!</p>

      <h3>Ongoing Competitions</h3>
      <div className="competition-list">
        {competitions.map((competition) => (
          <div key={competition.id} className="competition-item">
            <p>{competition.title} - {competition.description}</p>
            <p>Start Date: {new Date(competition.startDate).toDateString()}</p>
            <p>Duration: {competition.duration}</p>
            <button onClick={() => onVote(competition.id)}>Vote</button>
          </div>
        ))}
      </div>

      <button onClick={handleCreateCompetitionClick}>Create New Competition</button>
    </div>
  );
};
