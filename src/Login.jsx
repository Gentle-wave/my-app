import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://voting-system-bdvi.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.user.id; // Assuming the response includes the user's ID

        // Save the user's ID locally (e.g., in localStorage)
        localStorage.setItem("userId", userId);
        console.log("User ID saved in localStorage:", userId);
        toast.success("User Logged in successfully!");


        // Navigate to the LandingPage or your desired route
        navigate("/landingPage");
      } else {
        setError("Error loging in. Please try again.");
        // Handle login failure, e.g., display an error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("API request error:", error);
      console.alert("Login failed")
      setError("Error loging in. Please try again." + error);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit" onClick={handleSubmit}>Log In</button>
      </form>
      <button className="link-btn" onClick={navigateToRegister}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
