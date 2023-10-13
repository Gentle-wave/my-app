import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "Male" // Default gender
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const notify = () => toast.success('hurray User registered successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
  
    const errornotify = () => toast.error('oops! An error occured during registration, please try again later', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    try {
      const req = await fetch("https://voting-system-bdvi.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const response = await req.json();

      if (response.message === 'User created successfully') {
        // Registration was successful, navigate to the login screen
        console.log('success')
        notify();
        navigate("/login");
      } else {
        // Handle registration failure, e.g., display an error message
        errornotify();
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("API request error:", error);
      errornotify();
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegistration}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          id="firstName"
          placeholder="First Name"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          id="lastName"
          placeholder="Last Name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          id="email"
          placeholder="youremail@gmail.com"
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={user.gender}
          onChange={handleInputChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          id="password"
          placeholder="********"
        />

        <button type="submit" onClick={handleRegistration}>Register</button>
      </form>

      <button className="link-btn" onClick={() => navigate('/login')}>
        Already have an account? Login here.
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
