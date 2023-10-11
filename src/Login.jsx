
// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// export const Login = (props) => {
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const navigate = useNavigate(); // Use useNavigate instead of useNavigation

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }

//     const navigateToRegister = () => {
//         navigate('/register'); // Use navigate to redirect to the /register route
//     }

//     return (
//         <div className="auth-form-container">
//             <h2>Login</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email">email</label>
//                 <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     placeholder="youremail@gmail.com"
//                     id="email"
//                     name="email"
//                 />
//                 <label htmlFor="password">password</label>
//                 <input
//                     value={pass}
//                     onChange={(e) => setPass(e.target.value)}
//                     type="password"
//                     placeholder="********"
//                     id="password"
//                     name="password"
//                 />
//                 <button type="submit">Log In</button>
//             </form>
//             <button
//                 className="link-btn"
//                 onClick={navigateToRegister}
//             >
//                 Don't have an account? Register here.
//             </button>
//         </div>
//     );

// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch("https://voting-system-bdvi.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      });

      const response = await req.json();

      if (response.message === "Login successful") {
        const data = await response.json();
        const userId = data.userId; // Assuming the response includes the user's ID

        // Save the user's ID locally (e.g., in localStorage)
        localStorage.setItem("userId", userId);
        console.log('success')

        // Navigate to the LandingPage or your desired route
        navigate("/landingPage");
      } else {
        // Handle login failure, e.g., display an error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("API request error:", error);
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
