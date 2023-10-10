import React from "react";
import "./Das.css"

export const Dashboard = ({ user, competitions, onProfileClick, onCreateCompetitionClick, onVote }) => {
  return (
    <div className="dashboard">
      <h2>Hello, {user.firstName}</h2>
      <div className="profile-icon" onClick={onProfileClick}>
        {/* Add an icon for the user's profile */}
        <i className="fa fa-user"></i>
      </div>
      <p>Welcome to the Beauty Pageant App!</p>
      
      <h3>Ongoing Competitions</h3>
      <ul>
        {competitions.map((competition) => (
          <li key={competition.id}>
            {competition.name}
            <button onClick={() => onVote(competition.id)}>Vote</button>
          </li>
        ))}
      </ul>
      
      <button onClick={onCreateCompetitionClick}>Create New Competition</button>
    </div>
  );
};

