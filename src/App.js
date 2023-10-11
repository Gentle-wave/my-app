import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from './Dashboard'
import { CreateCompetition } from "./competition";
import { Vote } from "./vote";
import {nopage} from "./noPage"
import LandingPage from "./homepage"


export default function App() {
  // const [currentForm, setCurrentForm] = useState('Login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  const [user, setUser] = useState({
    firstName: "John", // Replace with the actual user data
  });

  const [competitions, setCompetitions] = useState([
    // Replace with an array of ongoing competitions
    { id: 1, name: "Competition 1" },
    { id: 2, name: "Competition 2" },
  ]);

  const [participants, setParticipants] = useState([
    // Replace with an array of participants for the selected competition
    { id: 1, name: "Candidate 1" },
    { id: 2, name: "Candidate 2" },
  ]);

  const handleCreateCompetition = (competition) => {
    // Handle creating a new competition and adding it to the list
    setCompetitions([...competitions, competition]);
  };

  const handleProfileClick = () => {
    // Handle clicking on the profile icon (navigate to profile page)
    // Implement the navigation logic here
  };

  const handleCreateCompetitionClick = () => {
    // Handle clicking on the "Create New Competition" button
    // Implement the navigation logic to the create competition page
  };

  const handleVote = (candidateName) => {
    // Handle voting for a candidate and update the participant list or other logic
    // You can implement the logic to update the vote count or track user votes here
    console.log(`Voted for ${candidateName}`);
  };



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="login" element={<Login/>} />
          <Route path="dashboard" element={<Dashboard
            user={user}
            competitions={competitions}
            onProfileClick={handleProfileClick}
            onCreateCompetitionClick={handleCreateCompetitionClick}
            onVote={handleVote}
          />} />
          <Route path="register" element={<Register />} />
          <Route path="participants" element={<Vote participants={participants} onVote={handleVote} />} />
          <Route path="createCompetition" element={<CreateCompetition onCreateCompetition={handleCreateCompetition} />} />
          <Route path="landingPage" exact component={<LandingPage/>} />
          <Route path="*" element={<nopage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


 

