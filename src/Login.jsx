
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useNavigation

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    const navigateToRegister = () => {
        navigate('/register'); // Use navigate to redirect to the /register route
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button type="submit">Log In</button>
            </form>
            <button
                className="link-btn"
                onClick={navigateToRegister}
            >
                Don't have an account? Register here.
            </button>
        </div>
    );

}
