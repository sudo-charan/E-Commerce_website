import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/SignIn.css";

const SignIn = ({ setIsAuthenticated, setUsername }) => {
    const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/auth/login", formData, { withCredentials: true });
            if (response.data.success) {
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("username", response.data.username); // ✅ Store username
                setIsAuthenticated(true);
                setUsername(response.data.username); // ✅ Update state
                navigate("/");
            } else {
                setError(response.data.message || "Invalid login credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <form className="auth-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input type="text" placeholder="Email or Mobile Number" onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })} required />
                    <div className="password-container">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit">Login</button>
                    <p>New User? <Link to="/signup">Create an account</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
