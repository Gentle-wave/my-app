import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleJoinCompetition = () => {
    // When the "join a competition" button is clicked, navigate to the Dashboard
    navigate("/dashboard/:competitionId");
  };

  const handleNavigateToCompetition = () => {
    // When the "join a competition" button is clicked, navigate to the Dashboard
    navigate("/mycompetition");
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Showcase Your Ultimate Beauty. Radiant & Elegant
          </h1>
          <p className="primary-text">
            Skilled Beauty Masters Handle All the Preparations – From Primping to Preening – So You Can Embrace Your Fresh Elegance.
          </p>
          <button className="secondary-button" onClick={handleJoinCompetition}>
            join a competition <FiArrowRight />{" "}
          </button>
          <br></br>
          <button className="secondary-button" onClick={handleNavigateToCompetition}>
          My competition <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
