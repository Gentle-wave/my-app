import React, { useEffect, useState } from "react";
import "./Das.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = ({ user, onProfileClick,}) => {
  const userId = localStorage.getItem("userId");
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User ID saved in localStorage:", userId);
    // Fetch competitions from the API when the component mounts
    fetch("https://voting-system-bdvi.onrender.com/api/competitions")
      .then((response) => response.json())
      .then((data) => setCompetitions(data.competitions || [])) // Ensure competitions is an array
      .then(console.log('success'))
      .catch((error) => console.error("Error fetching competitions:", error));
  }, []);

  const handleCreateCompetitionClick = () => {
    // Navigate to the "createCompetition" page when the button is clicked
    navigate("/createCompetition");
  };

  const handlejoinCompetition = (competitionId) => {
    // Navigate to the "joincompetition" page with the competitionId as a parameter
    navigate(`/joincompetition/${competitionId}`);
  };

  const handleVoteCompetition = (competitionId) => {
    // Navigate to the "joincompetition" page with the competitionId as a parameter
    navigate(`/participants/${competitionId}`);
  };

  return (
    <div className="dashboard">
      <h2>Hello, </h2>
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
            <p>Duration: {competition.duration} days</p>
            <button onClick={() => handlejoinCompetition(competition.id)}>Join Competition</button>
            <button onClick={() => handleVoteCompetition(competition.id)}>Vote</button>
          </div>
        ))}
      </div>
      <br></br>
      <button onClick={handleCreateCompetitionClick}>Create New Competition</button>
    </div>
  );
};
