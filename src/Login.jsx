// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);

//   const notify = () => toast.success('User Logged in successfully!', {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   })

//   const errornotify = () => toast.error('Error loging in. Please check your details and try again..', {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://voting-system-bdvi.onrender.com/api/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password: pass }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const userId = data.user.id; // Assuming the response includes the user's ID

//         // Save the user's ID locally (e.g., in localStorage)
//         localStorage.setItem("userId", userId);
//         console.log("User ID saved in localStorage:", userId);
//         notify();


//         // Navigate to the LandingPage or your desired route
//         navigate("/landingPage");
//       } else {
//         // Handle login failure, e.g., display an error message
//         console.error("Login failed");
//         errornotify();
//       }
//     } catch (error) {
//       console.error("API request error:", error);
//       setError("oops! An error occured from the server, please try again" + error);
//     }
//   };

//   const navigateToRegister = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="auth-form-container">
//       <h2>Login</h2>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <label htmlFor="email">Email</label>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           placeholder="youremail@gmail.com"
//           id="email"
//           name="email"
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           value={pass}
//           onChange={(e) => setPass(e.target.value)}
//           type="password"
//           placeholder="********"
//           id="password"
//           name="password"
//         />
//         <button type="submit" onClick={handleSubmit}>Log In</button>
//       </form>
//       <button className="link-btn" onClick={navigateToRegister}>
//         Don't have an account? Register here.
//       </button>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const notify = () => toast.success('User Logged in successfully!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const errornotify = () => toast.error('Error logging in. Please check your details and try again..', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        const userId = data.user.id;
        localStorage.setItem("userId", userId);
        notify();
        navigate("/landingPage");
      } else {
        console.error("Login failed");
        errornotify();
      }
    } catch (error) {
      console.error("API request error:", error);
      setError("Oops! An error occurred from the server, please try again: " + error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
      )}
      <button className="link-btn" onClick={navigateToRegister}>
        Don't have an account? Register here.
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
