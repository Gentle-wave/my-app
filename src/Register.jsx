// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// export const Register = (props) => {
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [gender, setGender] = useState('Male')
//     const navigate = useNavigate(); // Use useNavigate instead of useNavigation

//     const navigateToLogin = () => {
//         navigate('/login'); // Use navigate to redirect to the /register route
//     }
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }
//     const handleGenderChange = (e) => {
//         setGender(e.target.value); // Update gender when the dropdown value changes
//     }

//     return (
//         <div className="auth-form-container">
//             <h2>Register</h2>
//             <form className="register-form" onSubmit={handleSubmit}>
//                 <label htmlFor="firstName">First Name</label>
//                 <input value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
//                 <label htmlFor="lastName">Last Name</label>
//                 <input value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />
//                 <label htmlFor="email">email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//                 <label for="gender">Gender</label>
//                 <select id="gender" name="gender" required onChange={handleGenderChange} value={gender}>
//                     <option value='Male'>Male</option>
//                     <option value='Female'>Female</option>
//                 </select>
//                 <label htmlFor="password">password</label>
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//                 <button type="submit">Log In</button>
//             </form>
//             <button className="link-btn" onClick={navigateToLogin}>Already have an account? Login here.</button>
//         </div>
//     )
// }

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
        navigate("/login");
      } else {
        // Handle registration failure, e.g., display an error message
        setError("Error Registration failed. Please try again.");
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("API request error:", error);
      setError("Error Registration failed. Please try again.");
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
    </div>
  );
};
