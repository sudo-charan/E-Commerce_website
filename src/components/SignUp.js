import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/SignUp.css";

const SignUp = ({ setIsAuthenticated, setUsername }) => {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", gender: "", email: "", phone: "", password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/auth/register", formData);
            if (response.data.success) {
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("username", response.data.firstName); // ✅ Store username
                setIsAuthenticated(true);
                setUsername(response.data.firstName);
                navigate("/");
            } else {
                setError(response.data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <form className="auth-form" onSubmit={handleSignup}>
                    <h2>Sign Up</h2>
                    {error && <p className="error-message">{error}</p>}
                    <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    <select onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <input type="tel" placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    <div className="password-container">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
                    <p>Already have an account? <Link to="/signin">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
