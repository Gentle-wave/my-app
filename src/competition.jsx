import React, { useState } from "react";
import "./competition.css"

export const CreateCompetition = ({ onCreateCompetition }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a competition object with the input values
    const competition = {
      title,
      description,
      startDate,
      duration,
    };
    // Pass the competition object to the parent component to handle creation
    onCreateCompetition(competition);
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

