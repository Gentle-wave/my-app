

import React, { useState } from "react";
import "./competition.css";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

export const CreateCompetition = ({ onCreateCompetition }) => {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a competition object with the input values
    const competitionData = {
      title,
      description,
      startDate,
      duration,
    };

    // Make a POST request to the API to create the competition
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(competitionData),
    })
      .then((response) => response.json())
      .then((createdCompetition) => {
        // Pass the created competition to the parent component to handle
        onCreateCompetition(createdCompetition);
        toast.success("Competition created successfully!");
        console.log("competition sucessfully created")
      })
      .catch((error) => {
        console.error("Error creating competition: ", error);
        // Show an error notification
        toast.error("Failed to create competition. Please try again.");
      });
  };

  return (
    <div className="create-competition">
      <h2>Create a New Competition</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Competition Title"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Competition Description"
          required
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label htmlFor="duration">Duration (in days)</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <button type="submit">Create Competition</button>
      </form>
    </div>
  );
};

