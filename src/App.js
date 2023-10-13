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
import MyCompetitions from "./mycompetition"
import JoinCompetition from "./joincompetition"
import CompetitionResults from "./voteresult"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

  const userId = localStorage.getItem("userId");
  const notify = () => toast.success('🦄 Wow so easy!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="login" element={<Login/>} />
          <Route path="dashboard/:competitionId" element={<Dashboard
            // user={user}
            // competitions={competitions}
            // onProfileClick={handleProfileClick}
            // onCreateCompetitionClick={handleCreateCompetitionClick}
            // onVote={handleVote}
          />} />
          <Route path="register" element={<Register />} />
          <Route path="participants/:competitionId" element={<Vote />} />
          <Route path="createCompetition" element={<CreateCompetition />} />
          <Route path="landingPage" element ={<LandingPage/>} />
          <Route path="mycompetition" element={<MyCompetitions/>} />
          <Route path="joincompetition/:competitionId" element={<JoinCompetition/>} />
          <Route path="voteresults/:competitionId" element={<CompetitionResults />} />
          <Route path="*" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


 

